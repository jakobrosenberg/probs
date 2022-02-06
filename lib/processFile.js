import { pathToFileURL } from 'url'
import { createTest } from './test.js'
import assert from 'assert'
import { createHooksCollection, resolveConfig } from './utils.js'
import { diff } from 'jest-diff'

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

    if (options.globals) {
        const test = createTest([file], { options, hooks }, promiseQueue)
        const globals = {
            test,
            it: test,
            describe: test,
            assert,
            _probsFile: file,
            ...hooks,
        }

        if (options.globals) Object.assign(global, globals)
    }
    // file to be tested
    await import(pathToFileURL(file).href)
    await Promise.all(promiseQueue)
    await hooks.afterAll.run()
    if (options.teardownFile) await options.teardownFile(file, { options })
    options.reporter.closedFile({ scope: [file] })
}

export const runFileWithoutWorker = processFile
