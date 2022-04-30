import { probs } from '../../lib/Framework/probs.js'

test('can use expect', async ({ file }) => {
    const promises = [
        probs(file.relativeDir + '/_tests/expect', { runner: 'fork' }),
        probs(file.relativeDir + '/_tests/expect', { runner: 'worker' }),
        probs(file.relativeDir + '/_tests/expect', { runner: 'main' }),
    ]

    const [worker, fork, main] = await Promise.all(promises)

    test('fork', () => runAssertions(fork))
    test('worker', () => runAssertions(worker))
    test('main', () => runAssertions(main))

    function runAssertions(runner) {
        const { children } = runner.children['test/testing/_tests/expect/expect.test.js']

        assert.equal(children['can use expect'].status, 'pass')
        assert.equal(children['expect can error'].status, 'fail')
        assert(children['expect can error'].ownErr.message.match(/toBeTruthy/))
    }
})
