import { workerData, parentPort } from 'worker_threads'
import { testFile } from './testFile.js'

const { file, options } = workerData

const reporter = new Proxy({}, {
    get: (_, event) => (params) => parentPort.postMessage({ event, ...params, time: Date.now() })
})

testFile(file, { ...options, reporter })