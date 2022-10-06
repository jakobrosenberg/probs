import { probs } from '../../lib/Framework/probs.js'

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
    const promises = /** @type {Promise<TestState>[]} */ ([
        probs(file.relativeDir + '/_tests/hooks', { runner: 'worker' }),
        probs(file.relativeDir + '/_tests/hooks', { runner: 'fork' }),
        probs(file.relativeDir + '/_tests/hooks', { runner: 'main' }),
    ])
    const [worker, fork, main] = await Promise.all(promises)

    assert.equal(worker.status, 'pass')
    assert.equal(fork.status, 'pass')
    assert.equal(main.status, 'pass')
})

test('can use file hooks', async ({ file }) => {
    const promises = /** @type {Promise<TestState>[]} */ ([
        probs(file.relativeDir + '/_tests/fileHooks', { runner: 'worker' }),
        probs(file.relativeDir + '/_tests/fileHooks', { runner: 'fork' }),
        probs(file.relativeDir + '/_tests/fileHooks', { runner: 'main' }),
    ])
    const [worker, fork, main] = await Promise.all(promises)
    assert.equal(worker.status, 'pass')
    assert.equal(fork.status, 'pass')
    assert.equal(main.status, 'pass')
})
