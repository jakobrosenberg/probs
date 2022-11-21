/**
 * @typedef {Object} TestQueueItem
 * @prop {string} msg
 * @prop {(ctx: TestCbPayload)=>void} callback
 * @prop {boolean} skip should skip the test
 */

import { createParallelHooksCollection } from 'hookar'
import assert from 'assert'
import { addTimeoutToPromise, fileFromScope } from '../../utils/misc.js'
import { createExpect } from './utils/expect.js'
import { cloneKeys, portableError, scopeMatchesPattern } from './utils/index.js'

/**
 * The instance of a single test
 */
export class TestInstance {
    /** @type { TestInstance[] } */
    children = []

    status = null
    ownStatus = null
    ownErr = null
    comments = []

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
     * @param {Partial<ProbsOptions & ProbsConfig>} options
     * @param {TestInstance=} parent
     */
    constructor(name, callback, testFile, options, parent) {
        this.name = name
        this.testFile = testFile
        this.parent = parent
        this.callback = callback
        this.options = { ...options }
        if (!scopeMatchesPattern(this.scope, this.testFile.options.pattern))
            this.ownStatus = 'skipped'

        /** @type {TestCbPayload} */
        this.callbackContext = {
            file: fileFromScope(this.scope),
            scope: this.scope,
            ...this.hooks,
            // expect wrapper that includes a localized "toMatchSnapshot"
            expect: createExpect(this.scope, testFile.options.updateSnapshots),
            options: this.options,
            comment: msg => this.comments.push(msg),
            skip: msg => {
                this.comments.push(msg)
                this.ownStatus = 'skipped'
            },
        }

        const registerTest = this.registerTestCb.bind(this)

        this.globals = {
            test: registerTest,
            it: registerTest,
            describe: registerTest,
            expect: createExpect(this.scope, testFile.options.updateSnapshots),
            assert,
            ...this.hooks,
        }
    }

    async runTestCallback() {
        try {
            const cbPromise = this.callback(this.callbackContext)
            await addTimeoutToPromise(cbPromise, this.options.timeout)
            // this.ownStatus = 'pass'
            this.ownStatus = this.ownStatus || 'pass'
        } catch (e) {
            if (e.skipReason) {
                console.log('skip reason', e.skipReason)
                this.ownStatus = 'skipped'
            } else {
                this.ownStatus = 'fail'
                this.ownErr = portableError(e)
                // todo needs test
                this.options.onError && this.options.onError(this.callbackContext)
                if (this.testFile.options.haltOnErrors) {
                    this.testFile.emitter('finishedTest', {
                        scope: this.scope,
                        status: 'fail',
                        ownErr: this.ownErr,
                        comments: this.comments
                    })
                    throw this.ownErr
                }
            }
        }
    }

    emitStarted() {
        this.testFile.emitter('startedTest', { scope: this.scope })
    }

    emitFinished() {
        const payload = cloneKeys(this, ['scope', 'ownStatus', 'ownErr', 'comments'])
        this.testFile.emitter('finishedTest', payload)
    }

    async runChildren() {
        await this.hooks.beforeAll.run(this.callbackContext)
        for (const child of this.children) {
            if (child.ownStatus === 'skipped') child.emitFinished()
            else {
                await this.hooks.beforeEach.run(child.callbackContext)
                // todo insert await resource queue here
                child.emitStarted()
                await child.run()
                child.emitFinished()
                await this.hooks.afterEach.run(child.callbackContext)
            }
        }
        await this.hooks.afterAll.run(this.callbackContext)
    }

    async run() {
        // set globals so that any nested tests and hooks get assigned to the right context
        this.applyGlobals()
        // this will run the test. Any nested tests will be added to this.children
        await this.runTestCallback()
        await this.runChildren()

        this.restoreGlobals()
    }

    async registerTestCb(msg, ...params) {
        const callback = params.pop()
        const options = { ...this.options, ...params.pop() }

        this.testFile.emitter('addedTest', { scope: [...this.scope, msg] })
        this.children.push(new TestInstance(msg, callback, this.testFile, options, this))
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
