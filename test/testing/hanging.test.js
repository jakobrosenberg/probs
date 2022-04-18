import { Probs, probs } from '../../lib/probs.js'

// todo
/**
  orchestration
    config
    scanning
    setup

  testing
    nesting
    hooks
    concurrency
    resource-sharing

  report if not tests are found
 */

test('kills hanging tests', async ({ file }) => {
    const promises = [
        probs(file.relativeDir + '/_tests/hanging', { timeout: 150, runner: 'worker' }),
        probs(file.relativeDir + '/_tests/hanging', { timeout: 150, runner: 'fork' }),
        probs(file.relativeDir + '/_tests/hanging', { timeout: 150, runner: 'main' }),
    ]

    const [worker, fork, main] = await Promise.all(promises)

    test('fork', () => runAssertions(fork))
    test('worker', () => runAssertions(worker))
    test('main', () => runAssertions(main))

    function runAssertions(runner) {
        const { children } =
            runner.children['test/testing/_tests/hanging/hanging.test.js']
        assert.equal(children['I hang a little'].status, 'pass')
        assert.equal(children['I also hang a little'].status, 'pass')
        assert.equal(children['I hang too much'].status, 'fail')
        assert.equal(children['I hang too much'].ownErr.text, 'Error: timed out (150 ms)')
    }
})
