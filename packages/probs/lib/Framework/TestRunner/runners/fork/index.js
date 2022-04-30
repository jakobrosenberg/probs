import { fork as _fork } from 'child_process'
import { createDirname } from '../../../../utils/misc.js'

const __dirname = createDirname(import.meta)

/**
 @type {ProbsRunner}
 */
export const fork = (probs, file, options) =>
    new Promise((resolve, reject) => {
        probs.callEvent('openedFile', { scope: [file] })

        const workerOptions = options.worker ? options.worker({ file }) : {}

        const child = _fork(__dirname + '/fork.js', {
            ...(options.worker ? options.worker({ file }) : {}),
            execArgv: [
                '--enable-source-maps',
                '--no-warnings',
                ...(workerOptions.execArgv || [])
            ],
            env: {
                __probsConfig: JSON.stringify(options),
            },
        })

        child.on('message', msg => {
            if (msg === 'child_ready') {
                child.send({ task: { file, options } })
            }
            if (msg['report']) {
                const { eventName, ...args } = msg['report']
                probs.callEvent(eventName, args)
            }
        })
        child.on('error', reject)
        child.on('exit', code => {
            if (code !== 0) reject(new Error(`Fork stopped with exit code ${code}`))
            else resolve()
        })
    })
