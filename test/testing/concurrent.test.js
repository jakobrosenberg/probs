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

test('can run tests concurrently / in sequence', async ({ file }) => {
    const concurrentTester = createConcurrentTester(file, 2)
    const sequenceTester = createConcurrentTester(file, 1)
    const expectedConcurrent = ['task1', 'task1', 'task2', 'task2', 'task3', 'task3']
    const expectedSequence = ['task1', 'task2', 'task3', 'task1', 'task2', 'task3']

    const promises = [
        concurrentTester('worker'),
        concurrentTester('fork'),
        sequenceTester('worker'),
        sequenceTester('fork'),
        sequenceTester('main'),
    ]

    const [concurrentWorker, concurrentFork, sequenceWorker, sequenceFork, sequenceMain] =
        await Promise.all(promises)

    test('fork', () => {
        assert.deepEqual(concurrentFork, expectedConcurrent)
        assert.deepEqual(sequenceFork, expectedSequence)
    })
    test('worker', () => {
        assert.deepEqual(concurrentWorker, expectedConcurrent)
        assert.deepEqual(sequenceWorker, expectedSequence)
    })
    test('main (no concurrency)', () => {
        assert.deepEqual(sequenceMain, expectedSequence)
        // todo concurrent
    })
})

const createConcurrentTester =
    (file, concurrency = 2) =>
    async runner => {
        const completedTasks = []
        const path = file.relativeDir + '/_tests/concurrency'
        const p = new Probs({ runner, path, concurrency })
        p.onFinishedTest(ctx => completedTasks.push(ctx.scope[1]))

        await p.run()
        return completedTasks
    }
