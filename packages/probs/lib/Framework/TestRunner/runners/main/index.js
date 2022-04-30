import { TestFile } from '../../TestFile.js'

/**
 @type {ProbsRunner}
 */
export const main = (probs, file, options) => {
    const emitter = probs.callEvent.bind(probs)
    const testFile = new TestFile(file, emitter, options)
    return testFile.run()
}
