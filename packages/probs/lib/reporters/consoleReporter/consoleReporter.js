import { TestState } from '../../Framework/StateManager.js'
import { formatters } from './utils.js'
console.time('total')

/**
 * @param {import('../../Framework/StateManager.js').TestState} testState
 */
const printTest = testState => {
    const indentation = testState.level * 2
    if (testState.isFile) console.log(formatters.fileText(testState))
    else {
        console.log(formatters.testText(testState, ''.padStart(indentation, ' ')))
        if (testState.ownErr && testState.ownErr.code !== 'ERR_TIMEOUT')
            console.error(
                `${testState.ownErr.name}: ${testState.ownErr.message}`,
                testState.ownErr.stack,
            )
    }

    if (testState.hasChildren) Object.values(testState.children).forEach(printTest)
}

/**
 *
 * @param {import('../../Framework/probs.js').Probs} probs
 */
export const consoleReporter = probs => {
    probs.onClosedFile(ctx => printTest(ctx.state))

    probs.onFinishedAllTests(ctx => {
        /** @type {TestState[]} */
        const files = Object.values(ctx.state.children)
        /** @type {TestState[]} */
        const tests = files.map(file => file.descendants).flat()
        const passedTests = tests.filter(test => test.ownStatus === 'pass')
        const skippedTests = tests.filter(test => test.ownStatus === 'skipped')
        const failedTests = tests.filter(test => test.ownStatus === 'fail')

        console.log('Tests passed:', passedTests.length, '/', tests.length)
        if (skippedTests.length)
            console.log('Tests skipped:', skippedTests.length, '/', tests.length)
        if (failedTests.length)
            console.log('Tests failed:', failedTests.length, '/', tests.length)
        console.log(`Total time: ${ctx.state.duration / 1000}s`)
    })
}
