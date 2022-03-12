import { processFile } from '../../processFile.js'

/**
 * @param {ProbEvents} eventName
 */
const emitter = (eventName, params) =>
    process.send({ report: { eventName, ...params, time: Date.now() } })

process.on('message', async msg => {
    if (msg['task']) {
        const { file, options } = msg['task']
        await processFile(file, emitter, options)
        process.exit()
    }
})

process.send('child_ready')
