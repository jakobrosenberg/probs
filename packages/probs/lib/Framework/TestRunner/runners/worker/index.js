import { Worker } from 'worker_threads'
import { createDirname } from '../../../../utils/misc.js'

const __dirname = createDirname(import.meta)

/**
 @type {ProbsRunner}
 */
export const worker = (probs, file, options) =>
    new Promise((resolve, reject) => {
        const time = Date.now()
        let killReason = null

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
            ],
            env: {
                ...process.env,
                __probsTestFile: file,
                __probsConfig: stringifiedOptions,
                // @ts-ignore
                ...workerOptions.env,
            },
        })

        worker.on('message', ({ eventName, ...args }) => {
            probs.callEvent(eventName, { ...args })

            if (args.ownErr?.code === 'ERR_TIMEOUT') {
                probs.callEvent('closedFile', { scope: [file], time: Date.now() - time })
                killReason = 'timeout'
                worker.terminate()
            }
        })

        worker.on('error', err => {
            console.error('worker errored', err)
            reject(err)
        })
        worker.on('exit', code => {
            if (code !== 0) {
                if (killReason === 'timeout') {
                    resolve()
                    console.log(
                        `Worker for ${file} was killed because a timeout was detected.`,
                    )
                } else reject(new Error(`Worker stopped with exit code ${code}`))
            } else resolve()
        })
    })
