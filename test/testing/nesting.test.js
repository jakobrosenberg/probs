import { probs } from '../../lib/probs.js'
import { flatSummary } from './_utils.js'

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

    const nestedTestTester = async runner =>
        probs(file.relativeDir + '/_tests/nesting', { runner })

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