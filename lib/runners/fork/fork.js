import { processFile } from '../../processFile.js'

process.on('message', async msg => {
    if (msg.task) {
        const { file, options } = msg.task
        await processFile(file, { ...options, reporter })
        process.exit()
    }
})

const reporter = new Proxy(
    {},
    {
        get: (_, event) => params =>
            process.send({ report: { event, ...params, time: Date.now() } }),
    },
)

process.send('child_ready')
