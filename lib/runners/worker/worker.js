import { workerData, parentPort } from 'worker_threads'
import { TestFile } from '../../TestRunner.js'

const { file, options } = workerData

/**
 * @param {ProbEvents} eventName
 * @returns
 */
const emitter = (eventName, params) => {
    parentPort.postMessage({ eventName, ...params, time: Date.now() })
}
const testRunner = new TestFile(file, emitter, options)
testRunner.run()
