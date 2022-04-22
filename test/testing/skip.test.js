import { createTestSuite, flatSummary } from './_utils.js'

// todo fix main
const testSuite = createTestSuite(true, ['worker', 'fork'])

test('can skip unmatched tests', async ({ file }) => {
    const path = file.relativeDir + '/_tests/skip'
    const options = { path, pattern: ['//test.1//test.1.2'] }
    await testSuite('matches all files', options, result => {
        
        assert.equal(
            flatSummary(result),
            [
                '        pass     test/testing/_tests/skip/file1.test.js',
                'pass    pass       test.1',
                'skipped skipped      test.1.1',
                'pass    pass         test.1.2',
                'skipped skipped      test.1.3',
                'skipped skipped      test.1.4',
                'skipped skipped    test.2',
                '        pass     test/testing/_tests/skip/file2.test.js',
                'pass    pass       test.1',
                'skipped skipped      test.1.1',
                'pass    pass         test.1.2',
                'skipped skipped      test.1.3',
                'skipped skipped      test.1.4',
                'skipped skipped    test.2',
                '        pass     test/testing/_tests/skip/file3.test.js',
                'pass    pass       test.1',
                'skipped skipped      test.1.1',
                'pass    pass         test.1.2',
                'skipped skipped      test.1.3',
                'skipped skipped      test.1.4',
                'skipped skipped    test.2',
            ].join('\r\n'),
        )
    })
})
