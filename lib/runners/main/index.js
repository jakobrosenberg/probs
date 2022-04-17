import { TestFile } from '../../TestRunner.js'


/**
 @type {ProbsRunner}
 */
export const main = (probs, file, options) => {
    const emitter = probs.callEvent.bind(probs)
    const testRunner = new TestFile(file, emitter, options)
    return testRunner.run()
}
