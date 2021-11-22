import { readdir, stat } from 'fs'
import { resolve } from 'path'
import picomatch from 'picomatch'
import * as reporters from './reporters/index.js'
import { runFileWithWorker, testFile } from './testFile.js'
import { resolveConfig } from './utils.js'



const createFilesQueue = (options) => {
    const { workers, reporter } = options
    const running = []
    const pending = []
    let finished = false

    const processQueueWithWorker = async () => {
        while (pending.length) {
            const { file, options } = pending.shift()
            const worker = runFileWithWorker(file, options)
            running.push(worker)
            await worker
            running.splice(running.indexOf(worker), 1)
        }
    }

    const processQeueWithoutWorker = async ({ file, options }) => {
        testFile(file, options)
    }

    /**
     * @param {{file: string, options: any}} fileItem 
     */
    const add = async (fileItem) => {
        const { file } = fileItem
        if (finished)
            throw new Error("can't add test file after tests have finished: " + file)
        reporter.addedFile({ scope: [file], fileItem })
        pending.push(fileItem)
        if (!workers)
            processQeueWithoutWorker(fileItem)
        if (running.length < workers)
            await processQueueWithWorker()
        if (!running.length && !pending.length && !finished) {
            finished = true // make sure only one file calls finishedAllTests
            reporter.finishedAllTests({})
        }
    }
    return { add }
}

const mergeScopedConfig = async (path, files, config) => {
    const scopedConfigFile = files.find(name => name.match(/probs\.config\..?(j|t)s/))
    if (scopedConfigFile) {
        const scopedConfigPath = 'file:///' + resolve(path, scopedConfigFile)
        const scopedConfig = await import(scopedConfigPath).then(r => r.default)
        return {
            ...config,
            ...scopedConfig,
            scopedConfigs: [...config.scopedConfigs, scopedConfigPath]
        }
    }
    return config
}

export const runner = async (path, options = {}) => {
    options.path = path
    options.scopedConfigs = []
    options = { ...await resolveConfig(options), ...options }
    options.reporter = reporters[options.reporter](options.reporterOptions)
    options.workers = options.workers
    const paths = [path].flat(Infinity)
    const filesQueue = createFilesQueue(options)
    const isMatch = picomatch(options.glob)
    const isIgnore = picomatch(options.ignore)
    const scanDir = (path, { ...options }) => {
        readdir(path, async (err, _files) => {
            if (err) throw err
            options = await mergeScopedConfig(path, _files, options)
            _files
                .map(file => [path, file].join('/').replace(/\\/g, '/'))
                .forEach(file => {
                    if (!isIgnore(file))
                        stat(file, (err, stats) => {
                            if (err) throw (err)
                            if (stats.isDirectory()) scanDir(file, options)
                            else if (isMatch(file)) { filesQueue.add({ file, options }) }
                        })
                })
        })
    }
    paths.forEach(path => scanDir(path, options))
}

