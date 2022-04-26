/**
 * @typedef {Object} ReporterCtx
 * @prop {Scope=} scope
 * @prop {Error=} err
 * @prop {Status=} status
 */

import { BusyMap } from './TestRunner/utils/index.js'

/**
 * @template T
 * @typedef {ReporterCtx & T} EnhancedReporterCtx
 */

/**
 * @typedef {ReporterCtx & {rootTestState: TestState, testState: TestState}} StateProxyCtx
 */

/**
 * @callback Reporter
 * @prop {Reporter} ctx
 */

/**
 * @template C
 * @callback ReporterCallback
 * @param {C} ctx
 * @param {...any} params
 */

/**
 * @template T
 * @typedef {Object} ReporterCollection
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} addedFile
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} openedFile
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} closedFile
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} addedTest
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} startedTest
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} finishedAllTests
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} catch
 * @prop {ReporterCallback<{scope: Scope, status: Status, err: Error} & T>} finishedTest
 */

export class StateManager {
    log = []
    activeTasks = new BusyMap()

    /**
     *
     * @param {import('./Probs.js').Probs} probs
     */
    constructor(probs) {
        this.probs = probs
        this.rootTestState = new TestState()

        probs.onAddedFile(params => {
            const state = this._addTestState(params)
            this.log.push('addedFile', params)
            return { ...params, state }
        })
        probs.onAddedTest(params => {
            const state = this._addTestState(params)
            this.log.push('addedTest', params)
            return { ...params, state }
        })
        probs.onOpenedFile(params => {
            this.rootTestState.startedAt = this.rootTestState.startedAt || new Date
            const state = this.getByScope(params.scope)
            this.log.push('openedFile', params)
            state.started()
            return { ...params, state }
        })
        probs.onStartedTest(params => {
            const state = this.getByScope(params.scope)
            this.log.push('startedTest', params)
            state.started()
            return { ...params, state }
        })
        probs.onFinishedTest(params => {
            const state = this.getByScope(params.scope)
            this.log.push('finishedTest', params)
            state.finished(params)
            return { ...params, state }
        })
        probs.onClosedFile(params => {
            const state = this.getByScope(params.scope)
            this.log.push('closedFile', params)
            state.finished(params)
            return { ...params, state }
        })
        probs.onFinishedAllTests((ctx) => {
            this.rootTestState.finishedAt = new Date
            this.log.push('finishedAllTests')
            this.rootTestState.ownState = 'finished'
            return ctx
        })
    }

    /**
     * @param {string[]} scope
     * @returns {TestState}
     */
    getByScope(scope) {
        return scope.reduce(
            (testState, name) => testState.children[name],
            this.rootTestState,
        )
    }

    /**
     * @param {{scope: string[]}} param0
     * @returns {{state: TestState, scope: string[]}}
     */
    _addTestState({ scope }) {
        const parentScope = [...scope]
        const name = parentScope.pop()
        const parent = this.getByScope(parentScope)
        return {
            scope,
            state: new TestState({ scope, parent, name }),
        }
    }
}

/**
 * TestState represents Root, files and tests
 */
export class TestState {
    /** @type {Status} */
    ownStatus = null
    /** @type {Error & {text: string, raw: any}} */
    ownErr = null
    /** @type {Date} */
    startedAt = null
    /** @type {Date} */
    finishedAt = null
    /** @type {Object.<string, TestState>} */
    children = {}
    /** @type {TestState} */
    #parent = null

    /**
     * @param {{scope: Scope, parent: TestState, name: string}=} ctx
     */
    constructor(ctx) {
        /** @type {State} */
        this.ownState = 'pending'

        if (!ctx) return this

        const { scope, parent, name } = ctx
        this.name = name
        this.scope = scope
        this.#parent = parent
        this.#parent.children[name] = this
    }

    get descendants() {
        const arr = Object.values(this.children) 
        return [...arr, ...arr.map(a => a.descendants)].flat()
    }

    get parent() {
        return this.#parent
    }

    get level() {
        return this.scope?.length
    }

    get isFile() {
        return this.level === 1
    }

    get hasChildren() {
        return !!Object.values(this.children).length
    }

    get duration() {
        return this.finishedAt?.getTime() - this.startedAt?.getTime()
    }

    /** @returns {State[]} */
    get nestedStates() {
        return Object.values(this.children)
            .map(c => [c.ownState, ...c.nestedStates])
            .flat()
    }

    /** @returns {Status[]} */
    get nestedStatuses() {
        return Object.values(this.children)
            .map(c => [c.ownStatus, ...c.nestedStatuses])
            .flat()
    }

    /** @returns {Error[]} */
    get err() {
        const errors = Object.values(this.children).map(c => [
            { scope: c.scope, ...c.ownErr },
            ...c.err,
        ])
        return (
            errors
                .flat()
                // skip errors that only contain a scope
                .filter(err => err.message)
        )
    }

    /** @returns {Status} */
    get status() {
        /** @type {Status[]} */
        const statusMap = ['fail', 'pass', 'skipped']
        return [this.ownStatus, ...this.nestedStatuses]
            .filter(Boolean)
            .sort((a, b) => statusMap.indexOf(a) - statusMap.indexOf(b))
            .shift()
    }

    /** @returns {State} */
    get state() {
        const states = [this.ownState, ...this.nestedStates]
        return states.every(state => state === states[0]) ? states[0] : 'started'
    }

    started() {
        this.startedAt = new Date()
        this.ownState = 'started'
    }

    finished(ctx) {
        this.ownState = 'finished'
        this.finishedAt = new Date()

        if (ctx) {
            this.ownStatus = ctx.ownStatus
            this.ownErr = ctx.ownErr
        }
    }

    toJSON() {
        const skip = ['constructor', 'parent']
        return Reflect.ownKeys(TestState.prototype).reduce(
            (obj, key) => {
                if (!skip.includes(/**@type {string}*/ (key)))
                    obj[key] = this[key] || obj[key]
                return obj
            },
            { ...this },
        )
    }
}
