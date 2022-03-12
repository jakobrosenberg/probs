import { createParallelHooksCollection } from 'hookar'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

export const createDirname = meta => dirname(fileURLToPath(meta.url))

export const resolveConfig = async options => {
    const { configPath } = options
    const rootConfigPromise = getRootConfig(configPath)
    options.scopedConfigs = options.scopedConfigs || []
    const scopedConfigPromises = options.scopedConfigs.map(path =>
        import(path).then(r => r.default),
    )
    const configs = await Promise.all([rootConfigPromise, ...scopedConfigPromises])
    return configs.reduce((config, subConfig) => ({ ...config, ...subConfig }), options)
}

const getRootConfig = async configPath => {
    try {
        if (configPath)
            return import('file:///' + resolve(configPath)).then(r => r.default)
        try {
            return await import('file:///' + process.cwd() + '/probs.config.js').then(
                r => r.default,
            )
        } catch (_err) {
            if (_err.code === 'ERR_MODULE_NOT_FOUND') return {}
            throw _err
        }
    } catch (err) {
        console.log(`failed to import config: "${configPath}"`)
        throw err
    }
}

export const createHooksCollection = () => {
    let beforeAllPromise
    return {
        beforeAll: cb => {
            if (!beforeAllPromise && cb) beforeAllPromise = cb()
            return beforeAllPromise
        },
        afterAll: createParallelHooksCollection(),
        beforeEach: createParallelHooksCollection(),
        afterEach: createParallelHooksCollection(),
    }
}

/**
 * @param {'serial'|'parallel'} mode
 */
export const createQueuedFunctionWrapper = (mode = 'serial') => {
    /**
     * @type {{cb: function, resolve: function, reject: function, params: any}[]}
     */
    const queue = []
    let running = false
    const processQueue = async () => {
        if (!running || mode === 'parallel') {
            running = true
            let item
            while ((item = queue.shift())) {
                try {
                    const result = await item.cb(...item.params)
                    item.resolve(result)
                } catch (err) {
                    item.reject(err)
                }
            }
            running = false
        }
    }
    /**
     * Wraps a function in a queue runner. When the function is called, it gets pushed
     * to the queue and executed as soon as all preceding entries have been resolved
     * @template T
     * @param {T} cb
     * @returns {T}
     */
    const queueFunction = cb => {
        const queuedFunction = (...params) =>
            new Promise((resolve, reject) => {
                // @ts-ignore
                queue.push({ cb, params, resolve, reject })
                processQueue()
            })
        // @ts-ignore
        return queuedFunction
    }

    queueFunction.queue = queue
    return queueFunction
}

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

export const fileFromScope = scope => {
    const relativePath = scope[0]
    return {
        relativePath,
        path: resolve(relativePath),
        relativeDir: dirname(relativePath),
        dir: resolve(dirname(relativePath)),
    }
}