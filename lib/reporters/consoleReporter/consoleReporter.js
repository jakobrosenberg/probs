import { createTestStateManager, TestState } from '../../helpers/state.js'
import { formatters } from './utils.js'
console.time('total')

const { stateProxy } = createTestStateManager()

/**
 * @param {TestState} testState
 */
const printTest = (testState, options) => {
    const indentation = testState.level * 2

    if (testState.isFile)
        console.log(formatters.fileText(testState))
    else {
        console.log((''.padStart(indentation, ' ') + formatters.testText(testState)))
        if (testState.ownErr) console.error(
            `${testState.ownErr.name}: ${testState.ownErr.message}`, 
            testState.ownErr.stack)
    }

    if (testState.hasChildren)
        Object.values(testState.children)
            .filter(ts => ts.status !== 'skipped')
            .forEach(printTest, options)
}

export const ConsoleReporter = (options = {}) =>
    stateProxy({
        closedFile: ctx => printTest(ctx.testState, options),
        finishedAllTests: ({ rootTestState }) => {
            console.timeEnd('total')

            if (rootTestState.status !== 'pass')
                process.exit(1)
        },
    })
