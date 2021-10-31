import { createTestStateManager, TestState } from '../../helpers/state.js'
import { formatters } from './utils.js'
const log = console.log
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
        if (testState.err) console.error(testState.err)
    }

    if (testState.hasChildren)
        Object.values(testState.children)
            .filter(ts => ts.status !== 'skipped')
            .forEach(printTest, options)
}

export const ConsoleReporter = (options = {}) =>
    stateProxy({
        closedFile: ctx => printTest(ctx.testState, options),
        finishedAllTests: () => { console.timeEnd('total') },
    })
