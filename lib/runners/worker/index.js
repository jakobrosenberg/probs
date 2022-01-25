import { Worker } from 'worker_threads'
import { createDirname } from '../../utils.js'

const __dirname = createDirname(import.meta)

export const worker = (file, { reporter, ...options }) =>
    new Promise((resolve, reject) => {
        reporter.openedFile({ scope: [file] })

        const worker = new Worker(__dirname + '/worker.js', {
            workerData: {
                file,
                options: JSON.parse(JSON.stringify(options)),
            },
            ...(options.worker ? options.worker({ file }) : {}),
        })

        worker.on('message', ({ event, ...args }) => {
            if (reporter[event]) reporter[event]({ ...args })
            else if (reporter.catch) reporter.catch(event, { ...args })
        })

        worker.on('error', reject)
        worker.on('exit', code => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
            else resolve()
        })
    })
