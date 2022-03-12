import { workerData, parentPort } from 'worker_threads'
import { processFile } from '../../processFile.js'

const { file, options } = workerData

/**
 * @param {ProbEvents} eventName
 * @returns
 */
const emitter = (eventName, params) =>
    parentPort.postMessage({ eventName, ...params, time: Date.now() })

processFile(file, emitter, options)
