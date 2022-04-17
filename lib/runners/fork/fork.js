import { TestFile } from '../../TestRunner.js'

/**
 * @param {ProbEvents} eventName
 */
const emitter = (eventName, params) =>
    process.send({ report: { eventName, ...params, time: Date.now() } })

process.on('message', async msg => {
    if (msg['task']) {
        const { file, options } = msg['task']
        const testRunner = new TestFile(file, emitter, options)
        await testRunner.run()
        process.exit()
    }
})

process.send('child_ready')
