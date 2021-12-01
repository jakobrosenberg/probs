import { pathToFileURL } from 'url'
import { createTest } from './test.js'
import assert from 'assert'
import { Worker } from 'worker_threads'
import { createDirname, createHooksCollection, resolveConfig } from './utils.js'



const __dirname = createDirname(import.meta);

/**
 * testFile can run either directly or inside a worker
 * @param {string} file 
 * @param {any} options 
 */
export const testFile = async (file, options = {}) => {
    const hooks = createHooksCollection()
    options = { ...await resolveConfig(options) }

    if (options.setupFile) options.setupFile(file, { options })

    const promiseQueue = []

    if (options.globals) {
        const test = createTest([file], { options, hooks: hooks }, promiseQueue)
        const globals = {
            test,
            it: test,
            describe: test,
            assert,
            _probsFile: file,
            ...hooks
        }

        if (options.globals)
            Object.assign(global, globals)
    }
    // file to be tested
    await import(pathToFileURL(file).href)
    await Promise.all(promiseQueue)
    await hooks.afterAll.run()
}


export const runFileWithWorker = (file, { reporter, ...options }) => new Promise((resolve, reject) => {
    reporter.openedFile({ scope: [file] })    

    const worker = new Worker(__dirname + '/worker.js', {
        workerData: {
            file,
            options: JSON.parse(JSON.stringify(options)),
        },
        ...options.worker ? options.worker({ file }) : {}
    });
    worker.on('message', ({ event, ...args }) => {
        if (reporter[event]) reporter[event]({ ...args })
        else if (reporter.catch) reporter.catch(event, { ...args })
    })
    worker.on('exit', () => reporter.closedFile({ scope: [file] }))
    worker.on('error', reject);
    worker.on('exit', (code) => {
        if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        else resolve()
    })
})

export const runFileWithoutWorker = testFile