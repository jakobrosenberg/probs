import { processFile } from '../../processFile.js'

/**
 @type {ProbsRunner}
 */
export const main = (probs, file, options) => {
    const emitter = probs.callEvent.bind(probs)
    return processFile(file, emitter, options)
}
