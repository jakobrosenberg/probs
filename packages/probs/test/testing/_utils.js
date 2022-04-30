import { probs } from '../../lib/Framework/probs.js'

export const flatSummary = (state, depth = 0) => {
    let line = !state.name
        ? ''
        : (state.ownStatus || '').padEnd(7) + ' ' + state.status.padEnd(7) + ''.padStart(depth * 2, ' ') + state.name

    if (state.hasChildren)
        Object.values(state.children).forEach(value => {
            const delim = line ? '\r\n' : ''
            line = line + delim + flatSummary(value, depth + 1)
        })
    return line
}

/**
 * @typedef {'fork'|'worker'|'main'} RunnerEnum
 */

/**
 * @callback TestSuiteCb
 * @param {string} name
 * @param {Partial<ProbsOptions>} options
 * @param {(result: TestState, runner: RunnerEnum)=>void} suiteCb
 */

/**
 * @param {boolean=} sequence Run tests in sequence / parallel
 * @param {RunnerEnum[]=} runners
 * @returns {TestSuiteCb}
 */
 export const createTestSuite = (sequence = true, runners = ['fork', 'worker', 'main']) => {
    const sequenceTestSuite = async (name, options, suiteCb) => {
        for (const runner of runners) {
            await test(`${name} [${runner}]`, async () => {
                const result = await probs(options.path, { ...options, runner })
                suiteCb(result, runner)
            })
        }
    }
    const parallelTestSuite = async (path, options, suiteCb) => {
        const promises = runners.map(runner => probs(path, { ...options, runner }))
        const results = await Promise.all(promises)

        for (const index in runners) {
            await test(`run in ${runners[index]}`, async () => {
                suiteCb(results[index], runners[index])
            })
        }
    }
    return sequence ? sequenceTestSuite : parallelTestSuite
}