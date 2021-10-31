import { readdir, stat } from 'fs'
import pm from 'picomatch'
import * as reporters from './reporters/index.js'
import { runFileWithWorker } from './testFile.js'



const createFilesQueue = (options) => {
    const { workers, reporter } = options
    const running = []
    const pending = []

    const processQueueWithWorker = async () => {
        while (pending.length) {
            const file = pending.shift()
            const worker = runFileWithWorker(file, options)
            running.push(worker)
            await worker
            running.splice(running.indexOf(worker), 1)
        }
    }

    const add = async (file) => {
        reporter.addedFile({ scope: [file] })
        pending.push(file)
        if (running.length < workers)
            await processQueueWithWorker()
        if (!running.length && !pending.length) {
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
    const isMatch = pm('**.test.js')
    const scanDir = (path) => {
        readdir(path, (err, _files) => {
            if (err) throw err
            _files
                .map(file => [path, file].join('/'))
                .forEach(file => {
                    stat(file, (err, stats) => {
                        if (stats.isDirectory()) scanDir(file)
                        else if (isMatch(file)) filesQueue.add(file)
                    })
                })
        })
    }
    paths.forEach(scanDir)
}

