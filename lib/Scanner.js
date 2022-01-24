import { readdir, stat } from 'fs'
import { resolve } from 'path'
import picomatch from 'picomatch'
import { FilesQueue } from './FilesQueue.js'

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
    constructor(options) {
        this.filesQueue = new FilesQueue()
        this.isMatch = picomatch(options.glob)
        this.isIgnore = picomatch(options.ignore)
    }

    /**
     * scan dir recursively
     * @param {string} path
     * @param {*} options
     * @param {DirPromise[]} dirPromises
     */
    scanDir(path, { ...options }, dirPromises = []) {
        return readdir(path, async (err, _files) => {
            if (err) throw err
            options = await mergeScopedConfig(path, _files, options)

            if (options.setupDir) {
                options.reporter.setupDir({ scope: [path] })
                dirPromises = [
                    ...dirPromises,
                    {
                        promise: options.setupDir(),
                        subscribers: [],
                        teardownDir: options.teardownDir,
                    },
                ]
            }

            _files
                .map(file => [path, file].join('/').replace(/\\/g, '/'))
                .forEach(file => {
                    if (!this.isIgnore(file))
                        stat(file, (err, stats) => {
                            if (err) throw err
                            if (stats.isDirectory())
                                this.scanDir(file, options, dirPromises)
                            else if (this.isMatch(file)) {
                                const fileItem = { file, options, dirPromises }
                                dirPromises.forEach(dp => dp.subscribers.push(fileItem))
                                this.filesQueue.add(fileItem)
                            }
                        })
                })
        })
    }
}
