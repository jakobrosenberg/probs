import { createParallelHooksCollection } from 'hookar';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export const createDirname = meta => dirname(fileURLToPath(meta.url));

export const resolveConfig = async options => {
    const { configPath } = options
    const rootConfigPromise = getRootConfig(configPath)
    const scopedConfigPromises = options.scopedConfigs.map(path => import(path).then(r => r.default))
    const configs = await Promise.all([rootConfigPromise, ...scopedConfigPromises])
    return configs.reduce((config, subConfig)=>({...config, ...subConfig}), options)
}

const getRootConfig = async configPath => {
    try {
        if (configPath) return import('file:///' + resolve(configPath)).then(r => r.default)
        try {
            return await import('file:///' + process.cwd() + '/probs.config.js').then(r => r.default)
        } catch (_err) {
            if (_err.code === 'ERR_MODULE_NOT_FOUND')
                return {}
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
            if (!beforeAllPromise && cb)
                beforeAllPromise = cb()
            return beforeAllPromise
        },
        afterAll: createParallelHooksCollection(),
        beforeEach: createParallelHooksCollection(),
        afterEach: createParallelHooksCollection()
    }
}