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

test('can nest tests', async ({ file }) => {
    const expected = [
        'null pass  test/testing/_tests/nesting/nesting.test.js',
        'pass pass    nesting 1',
        'pass pass      nesting 2',
        'pass pass        nesting 3',
        'pass pass          nesting 4',
    ].join('\r\n')

    const nestedTestTester = createNestedTestTester(file)

    const promises = [
        nestedTestTester('worker'),
        nestedTestTester('fork'),
        nestedTestTester('main'),
    ]

    const [nestedWorker, nestedFork, nestedMain] = await Promise.all(promises)

    test('worker', () => {
        assert.deepEqual(flatSummary(nestedWorker), expected)
    })
    test('fork', () => {
        assert.deepEqual(flatSummary(nestedFork), expected)
    })
    test('main', () => {
        assert.deepEqual(flatSummary(nestedMain), expected)
    })
})

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
        assert.equal(children['I hang too much'].ownErr.text, 'timed out (150 ms)')
    }
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

const createNestedTestTester = file => async runner =>
    probs(file.relativeDir + '/_tests/nesting', { runner })

const flatSummary = (state, depth = 0) => {
    let line = !state.name
        ? ''
        : state.ownStatus + ' ' + state.status + ''.padStart(depth * 2, ' ') + state.name

    if (state.hasChildren)
        Object.values(state.children).forEach(value => {
            const delim = line ? '\r\n' : ''
            line = line + delim + flatSummary(value, depth + 1)
        })
    return line
}
