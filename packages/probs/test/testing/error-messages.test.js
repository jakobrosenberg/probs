import { Probs, probs } from '../../lib/Framework/probs.js'

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

test('error messages', async ({ file }) => {
    const promises = [
        probs(file.relativeDir + '/_tests/error-messages', { runner: 'worker' }),
        probs(file.relativeDir + '/_tests/error-messages', { runner: 'fork' }),
        probs(file.relativeDir + '/_tests/error-messages', { runner: 'main' }),
    ]

    const [worker, fork, main] = await Promise.all(promises)

    test('fork', () => runAssertions(fork))
    test('worker', () => runAssertions(worker))
    test('main', () => runAssertions(main))

    function runAssertions(runner) {
        const file = Object.values(runner.children)[0] // we're only testing one file
        assert.equal(file.status, 'fail')
        assert.equal(file.ownStatus, null)
        assert.equal(file.children['I throw an error'].status, 'fail')
        assert.equal(file.children['I throw an error'].ownStatus, 'fail')
        assert.equal(file.children['I throw an error'].ownErr.text, 'Error: I failed')

        assert.equal(file.children['My child throws an error'].status, 'fail')
        assert.equal(file.children['My child throws an error'].ownStatus, 'pass')
        assert.equal(file.children['My child throws an error'].children['I throw an error'].status, 'fail')
        assert.equal(file.children['My child throws an error'].children['I throw an error'].ownStatus, 'fail')
        assert.equal(file.children['My child throws an error'].children['I throw an error'].ownErr.text, 'Error: I failed')

        const gcTest = file.children['My grandchild throws an error']
        assert.equal(gcTest.status, 'fail')
        assert.equal(gcTest.ownStatus, 'pass')
        assert.equal(gcTest.children['My child throws an error'].status, 'fail')
        assert.equal(gcTest.children['My child throws an error'].ownStatus, 'pass')
        assert.equal(gcTest.children['My child throws an error'].children['I throw an error'].status, 'fail')
        assert.equal(gcTest.children['My child throws an error'].children['I throw an error'].ownStatus, 'fail')
        assert.equal(gcTest.children['My child throws an error'].children['I throw an error'].ownErr.text, 'Error: I failed')

        assert.equal(file.children['My child and I throw errors'].status, 'fail')
        assert.equal(file.children['My child and I throw errors'].ownStatus, 'fail')
        assert.equal(file.children['My child and I throw errors'].ownErr.text, 'Error: Parent failed')

        assert.equal(file.children['My child and I throw errors'].children['I throw an error'].status, 'fail')
        assert.equal(file.children['My child and I throw errors'].children['I throw an error'].ownStatus, 'fail')
        assert.equal(file.children['My child and I throw errors'].children['I throw an error'].ownErr.text, 'Error: Child failed')
    }
})
