import * as _expect from 'expect'
import JestSnapshot from 'jest-snapshot'
import snapshot from 'jest-snapshot'
import { basename, dirname } from 'path'

// esmoduleinterop fix
const expect =
    global['expect'] || /** @type {import('expect')} */ (_expect.default || _expect)

const { SnapshotState, toMatchSnapshot } = snapshot

/**
 * @param {string[]} scope
 * @param {'all'|'new'|'none'} updateSnapshot
 */
export const createExpect = (scope, updateSnapshot) => {
    function _expect(_actual) {
        const snapshotFile = `${dirname(scope[0])}/__snapshots__/${basename(
            scope[0],
        )}.snap`

        const called = expect(_actual)

        called.toMatchSnapshot = (
            hint,
            testFile = snapshotFile,
            testTitle = scope.join('/'),
        ) => {
            const snapshotState = new SnapshotState(testFile, {
                updateSnapshot,
                prettierPath: null,
                snapshotFormat: null,
            })

            const context = {
                snapshotState,
                currentTestName: testTitle,
            }

            /**@type {JestSnapshot['toMatchSnapshot']} */
            const matcher = toMatchSnapshot.bind(context)
            const args = [_actual, hint].filter(Boolean)
            // @ts-ignore
            const result = matcher(...args)

            assert(result.pass, !result.pass ? result.message() : '')

            snapshotState.save()
        }

        return called
    }
    return /** @type {expect} */ (_expect)
}
