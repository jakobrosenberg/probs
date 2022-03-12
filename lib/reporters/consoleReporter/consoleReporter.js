import { formatters } from './utils.js'
console.time('total')

/**
 * @param {import('../../helpers/state.js').TestState} testState
 */
const printTest = testState => {
    const indentation = testState.level * 2
    if (testState.isFile) console.log(formatters.fileText(testState))
    else {
        console.log(''.padStart(indentation, ' ') + formatters.testText(testState))
        if (testState.ownErr)
            console.error(
                `${testState.ownErr.name}: ${testState.ownErr.message}`,
                testState.ownErr.stack,
            )
    }

    if (testState.hasChildren)
        Object.values(testState.children)
            .filter(ts => ts.status !== 'skipped')
            .forEach(printTest)
}

/**
 *
 * @param {import('../../probs.js').Probs} probs
 */
export const consoleReporter = probs => {
    probs.onClosedFile(ctx => printTest(ctx.state))

    probs.onFinishedAllTests(ctx => console.timeEnd('total'))
    console.log('registered console reporter')
}
