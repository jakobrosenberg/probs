import { Worker } from 'worker_threads'
import { createDirname } from '../../utils/misc.js'
import { pathToFileURL } from 'url'
import { createRequire } from 'module'

const __dirname = createDirname(import.meta)
const require = createRequire(__dirname)

const esmChainLoaderUrl = pathToFileURL(require.resolve('esm-chain-loader'))
const testLoaderUrl = pathToFileURL(__dirname + '/../../testLoader.js')

/**
 @type {ProbsRunner}
 */
export const worker = (probs, file, options) =>
    new Promise((resolve, reject) => {
        probs.callEvent('openedFile', { scope: [file] })

        const workerOptions = options.worker ? options.worker({ file }) : {}
        const stringifiedOptions = JSON.stringify(options)
        
        const worker = new Worker(__dirname + '/worker.js', {
            workerData: {
                file,
                options: JSON.parse(stringifiedOptions),
            },
            ...workerOptions,
            execArgv: [
                '--enable-source-maps',
                '--no-warnings',
                ...(workerOptions.execArgv || []),
                '--experimental-loader',
                testLoaderUrl.href,
                '--experimental-loader',
                esmChainLoaderUrl.href,
            ],
            env: {
                __probsTestFile: file,
                __probsConfig: stringifiedOptions,
                // @ts-ignore
                ...workerOptions.env,
            },
        })

        worker.on('message', ({ eventName, ...args }) => {
            probs.callEvent(eventName, { ...args })
        })

        worker.on('error', err => {
            console.error('worker errored', err)
            reject(err)
        })
        worker.on('exit', code => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
            else resolve()
        })
    })
