import { pathToFileURL } from 'url'
import { createTest } from './test.js'
import assert from 'assert'
import {
    createHooksCollection,
    createQueuedFunctionWrapper,
    resolveConfig,
} from './utils/misc.js'
import { diff } from 'jest-diff'
import expect from 'expect'

global.probs = { testContext: {} }

// todo move
const originalEqual = assert.equal.bind(assert)
assert.equal = (actual, expected) => {
    try {
        originalEqual(actual, expected)
    } catch (err) {
        if (err.code === 'ERR_ASSERTION') {
            err.message = '\n' + diff(expected, actual, {}) + '\n'
            err.stack = err.stack.split('\n').slice(2).join('\n')
        }
        throw err
    }
}

/**
 * testFile can run either directly or inside a worker
 * @param {string} file
 * @param {any} options
 */
export const processFile = async (file, options = {}) => {
    const hooks = createHooksCollection()
    options = { ...(await resolveConfig(options)) }

    if (options.setupFile) await options.setupFile(file, { options })

    const promiseQueue = []
    const createQueuedFunction = createQueuedFunctionWrapper(options.testConcurrencyMode)

    if (options.globals) {
        const test = createTest(
            [file],
            { options, hooks, createQueuedFunction },
            promiseQueue,
        )
        const globals = {
            test,
            it: test,
            describe: test,
            expect,
            assert,
            _probsFile: file,
            ...hooks,
        }

        if (options.globals) Object.assign(global, globals)
    }
    // file to be tested
    try {
        await import(pathToFileURL(file).href)
    } catch (err) {
        console.error('Failed to run tests for', file)
        console.error(err)
    }
    await Promise.all(promiseQueue)
    await hooks.afterAll.run()
    if (options.teardownFile) await options.teardownFile(file, { options })
    options.reporter.closedFile({ scope: [file] })
}

export const runFileWithoutWorker = processFile
