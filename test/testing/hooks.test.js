import { probs } from '../../lib/probs.js'

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

test('can use hooks', async ({ file }) => {
    const promises = [
        probs(file.relativeDir + '/_tests/hooks', { runner: 'worker' }),
        probs(file.relativeDir + '/_tests/hooks', { runner: 'fork' }),
        probs(file.relativeDir + '/_tests/hooks', { runner: 'main' }),
    ]
    const [worker, fork, main] = await Promise.all(promises)
    assert.equal(worker.status, 'pass')
    assert.equal(fork.status, 'pass')
    assert.equal(main.status, 'pass')
})