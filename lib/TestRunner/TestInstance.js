/**
 * @typedef {Object} TestQueueItem
 * @prop {string} msg
 * @prop {(ctx: TestCbPayload)=>void} callback
 * @prop {boolean} skip should skip the test
 */

import { createParallelHooksCollection } from 'hookar'
import assert from 'assert'
import expect from 'expect'
import { addTimeoutToPromise, fileFromScope } from '../utils/misc.js'
import { createExpect } from './utils/expect.js'

/**
 *
 * @param {string[]} scope
 * @param {(string|RegExp)[]} patterns
 * @returns
 */
const scopeMatchesPattern = (scope, patterns) => {
    if (!patterns.length) return true
    const scopeStr = scope.join(' > ')
    return patterns.find(pattern => scopeStr.match(pattern))
}

/**
 * The instance of a single test
 */
export class TestInstance {
    /** @type { TestInstance[] } */
    children = []

    status = null
    ownStatus = null
    ownErr = null

    hooks = {
        beforeAll: createParallelHooksCollection(),
        afterAll: createParallelHooksCollection(),
        beforeEach: createParallelHooksCollection(),
        afterEach: createParallelHooksCollection(),
    }

    get scope() {
        return [...(this.parent?.scope || []), this.name]
    }

    globalsBackup = {}

    /**
     * @param {string} name
     * @param {(ctx: TestCbPayload)=>void} callback
     * @param {import('./TestFile').TestFile} testFile
     * @param {TestInstance=} parent
     */
    constructor(name, callback, testFile, parent) {
        this.name = name
        this.testFile = testFile
        this.parent = parent
        this.callback = callback
        this.skip = !scopeMatchesPattern(this.scope, this.testFile.options.pattern)

        this.callbackContext = {
            file: fileFromScope(this.scope),
            scope: this.scope,
            ...this.hooks,
            // expect wrapper that includes a localized "toMatchSnapshot"
            expect: createExpect(this.scope),
        }

        const registerTest = this.registerTestCb.bind(this)

        this.globals = {
            test: registerTest,
            it: registerTest,
            describe: registerTest,
            expect,
            assert,
            ...this.hooks,
        }
    }

    async runTestCallback() {
        try {
            const cbPromise = this.callback(this.callbackContext)
            await addTimeoutToPromise(cbPromise, this.testFile.options.timeout)
            this.ownStatus = 'pass'
        } catch (e) {
            this.ownStatus = 'fail'
            this.ownErr = {
                ...e,
                raw: e,
                text:
                    (e.toString && e.toString()) ||
                    e.message ||
                    e.name ||
                    '[no error description]',
                name: e.name,
                message: e.message,
                stack: e.stack,
                json: JSON.parse(JSON.stringify(e)),
            }
            if (this.testFile.options.haltOnErrors) {
                this.testFile.emitter('finishedTest', {
                    scope: this.scope,
                    status: 'fail',
                    ownErr: this.ownErr,
                })
                throw this.ownErr
            }
        }
    }

    async runChildren() {
        await this.hooks.beforeAll.run(this.callbackContext)
        for (const child of this.children) {
            await this.hooks.beforeEach.run(child.callbackContext)
            await child.run()
            await this.hooks.afterEach.run(child.callbackContext)
        }
        await this.hooks.afterAll.run(this.callbackContext)
    }

    async run() {
        // set globals so that any nested tests and hooks get assigned to the right context
        this.applyGlobals()
        this.testFile.emitter('startedTest', { scope: this.scope })
        // this will run the test. Any nested tests will be added to this.children
        await this.runTestCallback()
        await this.runChildren()

        this.restoreGlobals()

        const result = {
            scope: this.scope,
            ownStatus: this.ownStatus,
            ownErr: this.ownErr
        }

        const eventName = this.parent ? 'finishedTest' : 'closedFile'
        this.testFile.emitter(eventName, result)
    }

    async registerTestCb(msg, callback) {
        this.testFile.emitter('addedTest', { scope: [...this.scope, msg] })
        this.children.push(new TestInstance(msg, callback, this.testFile, this))
    }

    applyGlobals() {
        this.backupGlobals()
        Object.assign(global, this.globals)
    }

    backupGlobals() {
        Object.keys(this.globals).forEach(key => (this.globalsBackup[key] = global[key]))
    }

    restoreGlobals() {
        Object.assign(global, this.globalsBackup)
    }
}
