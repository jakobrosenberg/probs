import { workerData, parentPort } from 'worker_threads'
import { processFile } from '../../processFile.js'

const { file, options } = workerData

const reporter = new Proxy({}, {
    get: (_, event) => (params) => parentPort.postMessage({ event, ...params, time: Date.now() })
})

processFile(file, { ...options, reporter })