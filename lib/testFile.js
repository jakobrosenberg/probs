import { pathToFileURL, fileURLToPath } from 'url'
import { createTest } from './test.js'
import { dirname } from 'path'
import assert from 'assert'
import { Worker } from 'worker_threads'

const __dirname = dirname(fileURLToPath(import.meta.url));


export const testFile = async (file, options = {}) => {
    if (options.globals) {
        // @ts-ignore annoying jest
        global.test = createTest([file], options)
        // @ts-ignore annoying jest    
        global.assert = assert
        global._probsFile = file
    }
    await import(pathToFileURL(file).href)
}


export const runFileWithWorker = (file, { reporter, ...options }) => new Promise((resolve, reject) => {
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
