import { TestFile } from '../../TestRunner/TestFile.js'

/**
 * @param {ProbEvents} eventName
 */
const emitter = (eventName, params) =>
    process.send({ report: { eventName, ...params, time: Date.now() } })

process.on('message', async msg => {
    if (msg['task']) {
        const { file, options } = msg['task']
        const testFile = new TestFile(file, emitter, options)
        await testFile.run()
        process.exit()
    }
})

process.send('child_ready')
