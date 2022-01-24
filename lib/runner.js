import { readdir, stat } from 'fs'
import { resolve } from 'path'
import picomatch from 'picomatch'
import * as reporters from './reporters/index.js'
import { runFileWithWorker, testFile } from './testFile.js'
import { resolveConfig } from './utils.js'

/**
 *  @typedef {object} FileItem 
 *  @prop {string} file
 *  @prop {any} options
 *  @prop {DirPromise[]} dirPromises
 */

const createFilesQueue = (options) => {
    const { workers, reporter } = options
    /** @type {FileItem[]} */
    const pending = []
    const running = []
    let finished = false
    let waitingForDirSetup = 0

    const processQueueWithWorker = async () => {
        while (pending.length) {
            const fileItem = pending.shift()
            const { file, options } = fileItem
            const worker = runFileWithWorker(file, options)
            running.push(worker)
            await worker
            await teardownDirs(fileItem)
            running.splice(running.indexOf(worker), 1)
        }
    }

    /**
    * @param {FileItem} fileItem
    */
    const processQeueWithoutWorker = async ({ file, options }) => {
        testFile(file, options)
    }

    /**
     * @param {FileItem} fileItem
     */
    const teardownDirs = async (fileItem) => {
        fileItem.dirPromises.forEach(dp => {
            dp.subscribers = dp.subscribers.filter(sub => sub !== fileItem)
            if (!dp.subscribers.length)
                dp.teardownDir && dp.teardownDir()
        })
    }

    /**
     * @param {FileItem} fileItem
     */
    const waitForDirSetups = async (fileItem) => {
        waitingForDirSetup++
        await Promise.all(fileItem.dirPromises.map(dp => dp.promise))
        waitingForDirSetup--
    }

    /**
     * @param {FileItem} fileItem 
     */
    const add = async (fileItem) => {
        const { file } = fileItem

        await waitForDirSetups(fileItem)

        if (finished)
            throw new Error("can't add test file after tests have finished: " + file)

        reporter.addedFile({ scope: [file], fileItem })

        pending.push(fileItem)
        if (!workers)
            processQeueWithoutWorker(fileItem)
        if (running.length < workers)
            await processQueueWithWorker()
        if (!running.length && !pending.length && !waitingForDirSetup && !finished) {
            finished = true
            reporter.finishedAllTests({})
        }
    }
    return { add }
}

const mergeScopedConfig = async (path, files, {setupDir, teardownDir, ...config}) => {    
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

/**
 * @typedef {object} DirPromise
 * @prop {Promise} promise
 * @prop {FileItem[]} subscribers
 * @prop {function} teardownDir
 */

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

    /**
     * scan dir recursively
     * @param {string} path 
     * @param {*} options
     * @param {DirPromise[]} dirPromises 
     */
    const scanDir = (path, { ...options }, dirPromises = []) => {

        readdir(path, async (err, _files) => {
            if (err) throw err
            options = await mergeScopedConfig(path, _files, options)

            if (options.setupDir) {
                options.reporter.setupDir({ scope: [path] })
                dirPromises = [...dirPromises, {
                    promise: options.setupDir(),
                    subscribers: [],
                    teardownDir: options.teardownDir
                }]
            }

            _files
                .map(file => [path, file].join('/').replace(/\\/g, '/'))
                .forEach(file => {
                    if (!isIgnore(file))
                        stat(file, (err, stats) => {
                            if (err) throw (err)
                            if (stats.isDirectory()) scanDir(file, options, dirPromises)
                            else if (isMatch(file)) {
                                const fileItem = { file, options, dirPromises }
                                dirPromises.forEach(dp => dp.subscribers.push(fileItem))
                                filesQueue.add(fileItem)
                            }
                        })
                })
        })
    }
    paths.forEach(path => scanDir(path, options))
}

