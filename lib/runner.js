import { readdir, stat } from 'fs'
import picomatch from 'picomatch'
import * as reporters from './reporters/index.js'
import { runFileWithWorker, testFile } from './testFile.js'



const createFilesQueue = (options) => {
    const { workers, reporter } = options
    const running = []
    const pending = []
    let finished = false

    const processQueueWithWorker = async () => {
        while (pending.length) {
            const file = pending.shift()
            const worker = runFileWithWorker(file, options)
            running.push(worker)
            await worker
            running.splice(running.indexOf(worker), 1)
        }
    }

    const processQeueWithoutWorker = async (file) => {
        testFile(file, options)
    }

    const add = async (file) => {
        if (finished)
            throw new Error("can't add test file after tests have finished: " + file)
        reporter.addedFile({ scope: [file] })
        pending.push(file)
        if (!workers)
            processQeueWithoutWorker(file)
        if (running.length < workers)
            await processQueueWithWorker()
        if (!running.length && !pending.length && !finished) {
            finished = true // make sure only one file calls finishedAllTests
            reporter.finishedAllTests({})
        }
    }
    return { add }
}

export const runner = (path, options = {}) => {
    options.reporter = reporters[options.reporter](options.reporterOptions)
    options.workers = options.workers
    const paths = [path].flat(Infinity)
    const filesQueue = createFilesQueue(options)
    const isMatch = picomatch(options.glob)
    const isIgnore = picomatch(options.ignore)
    const scanDir = (path) => {
        readdir(path, (err, _files) => {
            if (err) throw err
            _files
                .map(file => [path, file].join('/'))
                .forEach(file => {
                    if (!isIgnore(file))
                        stat(file, (err, stats) => {
                            if (err) throw (err)
                            if (stats.isDirectory()) scanDir(file)
                            else if (isMatch(file)) { filesQueue.add(file) }
                        })
                })
        })
    }
    paths.forEach(scanDir)
}

