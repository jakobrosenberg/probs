import { readdir, stat } from 'fs'
import pm from 'picomatch'
import { Worker } from 'worker_threads'
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import { reporter } from './reporters/consoleReporter.js'
const __dirname = dirname(fileURLToPath(import.meta.url));


const runInWorker = (file, { reporter }) => new Promise((resolve, reject) => {
    reporter.openedFile(file)
    const worker = new Worker(__dirname + '/worker.js', { workerData: { file } });
    worker.on('message', ({ event, ...args }) =>
        reporter[event]({ ...args })
    )
    worker.on('exit', () => reporter.closedFile(file))
    worker.on('error', reject);
    worker.on('exit', (code) => {
        if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        else resolve()
    })
})

const createQueue = (options) => {
    const { queueSize, reporter } = options
    const running = []
    const pending = []
    const finished = []

    const queue = async (file) => {
        reporter.addedFile({ file })
        pending.push(file)
        if (running.length < queueSize) {
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
            reporter.finishedAllTests()
    }
    return { queue }
}

export const resolver = (path, options = {}) => {
    options.reporter = options.reporter || reporter(options.verbose)
    options.queueSize = options.queueSize || 5
    const paths = [path].flat(Infinity)
    const files = createQueue(options)
    const isMatch = pm('**.test.js')
    const scanDir = (path) => {
        readdir(path, (err, _files) => {
            _files
                .map(file => [path, file].join('/'))
                .forEach(file => {
                    stat(file, (err, stats) => {
                        if (stats.isDirectory()) scanDir(file)
                        else if (isMatch(file)) files.queue(file)
                    })
                })
        })
    }
    paths.forEach(scanDir)
}

