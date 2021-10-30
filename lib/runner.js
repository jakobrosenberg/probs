import { readdir, stat } from 'fs'
import pm from 'picomatch'
import { Worker } from 'worker_threads'
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import * as reporters from './reporters/index.js'
const __dirname = dirname(fileURLToPath(import.meta.url));


const runInWorker = (file, { reporter, ...options }) => new Promise((resolve, reject) => {
    reporter.openedFile({ scope: [file] })

    const workerOptions = JSON.parse(JSON.stringify(options))
    const worker = new Worker(__dirname + '/worker.js', { workerData: { file, options: workerOptions } });
    worker.on('message', ({ event, ...args }) =>
        reporter[event]({ ...args })
    )
    worker.on('exit', () => reporter.closedFile({ scope: [file] }))
    worker.on('error', reject);
    worker.on('exit', (code) => {
        if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        else resolve()
    })
})

const createFilesQueue = (options) => {
    const { workers, reporter } = options
    const running = []
    const pending = []
    const finished = []

    const add = async (file) => {
        reporter.addedFile({ scope: [file] })
        pending.push(file)
        if (running.length < workers) {
            while (pending.length) {
                const file = pending.shift()
                const worker = runInWorker(file, options)
                running.push(worker)
                await worker
                running.splice(running.indexOf(worker), 1)
                finished.push(worker)
            }
        }
        if (!running.length && !pending.length)
            reporter.finishedAllTests({})
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

