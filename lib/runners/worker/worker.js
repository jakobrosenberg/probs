import { workerData, parentPort } from 'worker_threads'
import { TestFile } from '../../TestRunner/TestFile.js'

const { file, options } = workerData

/**
 * @param {ProbEvents} eventName
 * @returns
 */
const emitter = (eventName, params) => {
    parentPort.postMessage({ eventName, ...params, time: Date.now() })
}
const testFile = new TestFile(file, emitter, options)
testFile.run()
