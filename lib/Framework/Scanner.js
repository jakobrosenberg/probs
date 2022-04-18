import { readdir, stat } from 'fs/promises'
import { resolve } from 'path'
import picomatch from 'picomatch'

const mergeScopedConfig = async (path, files, { setupDir, teardownDir, ...config }) => {
    const scopedConfigFile = files.find(name => name.match(/probs\.config\..?(j|t)s/))
    if (scopedConfigFile) {
        const scopedConfigPath = 'file:///' + resolve(path, scopedConfigFile)
        const scopedConfig = await import(scopedConfigPath).then(r => r.default)
        return {
            ...config,
            ...scopedConfig,
            scopedConfigs: [...config.scopedConfigs, scopedConfigPath],
        }
    }
    return config
}

export class Scanner {
    /**
     * @param {import('./probs').Probs} probs
     */
    constructor(probs) {
        this.probs = probs
        this.isMatch = picomatch(probs.options.glob)
        this.isIgnore = picomatch(probs.options.ignore)
        this.isActive = false
    }

    /**
     * scan dir recursively
     * @param {string} path
     * @param {*} options
     * @param {DirPromise[]} dirPromises
     */
    async scanDir(path, { ...options }, dirPromises = []) {
        const isRootFn = !this.isActive
        this.isActive = true

        const _files = await readdir(path)
        options = await mergeScopedConfig(path, _files, options)

        if (options.setupDir) {
            dirPromises = [
                ...dirPromises,
                {
                    promise: options.setupDir(),
                    subscribers: [],
                    teardownDir: options.teardownDir,
                },
            ]
        }

        const promises = _files
            .map(file => [path, file].join('/').replace(/\\/g, '/'))
            .map(async file => {
                if (!this.isIgnore(file)) {
                    const stats = await stat(file)
                    if (stats.isDirectory())
                        return this.scanDir(file, options, dirPromises)
                    else if (this.isMatch(file)) {
                        const fileItem = { file, options, dirPromises }
                        dirPromises.forEach(dp => dp.subscribers.push(fileItem))
                        this.probs.filesQueue.add(fileItem)
                    }
                }
            })

        await Promise.all(promises)

        if (isRootFn) {
            this.isActive = false
            this.probs.checkStatus()
        }
    }
}
