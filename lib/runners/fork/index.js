import { fork as _fork } from 'child_process'

import { createDirname } from '../../utils.js'

const __dirname = createDirname(import.meta)

export const fork = (file, { reporter, ...options }) =>
    new Promise((resolve, reject) => {
        reporter.openedFile({ scope: [file] })

        const child = _fork(__dirname + '/fork.js', {
            ...(options.worker ? options.worker({ file }) : {}),
        })

        child.on('message', msg => {
            if (msg === 'child_ready') {
                child.send({ task: { file, options } })
            }
            if (msg.report) {
                const { event, ...args } = msg.report
                if (reporter[event]) reporter[event]({ ...args })
                else if (reporter.catch) reporter.catch(event, { ...args })
            }
        })
        child.on('error', reject)
        child.on('exit', code => {
            if (code !== 0) reject(new Error(`Fork stopped with exit code ${code}`))
            else resolve()
        })
    })
