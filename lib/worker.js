import { workerData, parentPort } from 'worker_threads'
import { testFile } from './testFile.js'

const { file } = workerData

const reporter = new Proxy({}, {
    get: (target, event) => (params) => parentPort.postMessage({ event, ...params, time: Date.now() })
})

// const reporter = createConsoleReporter(file)

testFile(workerData.file, { reporter })