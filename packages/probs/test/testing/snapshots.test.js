import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { createTestSuite, flatSummary } from './_utils.js'

// todo fix main
const testSuite = createTestSuite(true, ['worker', 'fork'])

const expectGood =
    '// Jest Snapshot v1, https://goo.gl/fbAQLP\n\nexports[`test/testing/_tests/snapshots/snapshot.test.js/create snapshot 1`] = `"foobar"`;\n'
const expectBad =
    '// Jest Snapshot v1, https://goo.gl/fbAQLP\n\nexports[`test/testing/_tests/snapshots/snapshot.test.js/create snapshot 1`] = `"foo-changed-bar"`;\n'

test('snapshots', async ({ file }) => {
    const path = file.relativeDir + '/_tests/snapshots'
    const snapshotPath = path + '/__snapshots__/snapshot.test.js.snap'
    const getSnapshot = () =>
        existsSync(snapshotPath) && readFileSync(snapshotPath, 'utf-8')

    if (getSnapshot()) rmSync(snapshotPath)

    const options = { path }

    testSuite(
        'updateSnapshots:none creates no snapshots',
        { ...options, updateSnapshots: 'none' },
        async result => {
            const err =
                result.children['test/testing/_tests/snapshots/snapshot.test.js']
                    .children['create snapshot'].ownErr.message
            assert.match(err, /Received: .*"foobar"/)
            assert.equal(result.status, 'fail')
            assert.equal(getSnapshot(), false)
        },
    )

    testSuite('creates snapshot and passes', options, async result => {
        assert.equal(result.status, 'pass')
        assert.equal(getSnapshot(), expectGood)
    })

    testSuite('2nd test passes', options, result => {
        assert.equal(result.status, 'pass')
        assert.equal(getSnapshot(), expectGood)
    })

    test('__overwrite snapshot', () => {
        writeFileSync(snapshotPath, getSnapshot().replace('foobar', 'foo-changed-bar'))
    })

    testSuite('bad snapshot fails and remains bad', options, result => {
        assert.equal(result.status, 'fail')
        assert.equal(getSnapshot(), expectBad)
    })

    testSuite(
        'recreate snapshot option',
        { ...options, updateSnapshots: 'all' },
        result => {
            assert.equal(getSnapshot(), expectGood)
            assert.equal(result.status, 'pass')
        },
    )
})
