/**
 * @typedef {Object} ProbsTestPayload
 * @prop {string[]} parentScope
 * @prop {ProbsEmitter} emitter
 * @prop {ProbsOptions} options
 * @prop {createHooksCollection extends(...args: any[]) => infer U ? U : any} hooks
 * @prop {any} createQueuedFunction
 * @prop {any} parentPromiseQueue
 */

import { defaults } from './defaults.js'
import { addTimeoutToPromise, createHooksCollection, fileFromScope } from './utils/misc.js'
import { createExpect } from './utils/expect.js'

/** @returns {Status} */
const statusMap = ['fail', 'pass', 'skipped']
const getStatus = (...statuses) =>
    statuses
        .filter(Boolean)
        .sort((a, b) => statusMap.indexOf(a) - statusMap.indexOf(b))
        .shift()

/**
 * @param {ProbsTestPayload} payload
 */
export const createTest = ({
    parentScope = [],
    options,
    hooks,
    createQueuedFunction,
    emitter,
    parentPromiseQueue = [],
}) => {
    options = Object.assign({}, defaults, options)
    const { haltOnErrors, pattern } = options

    const test = async (msg, cb) => {
        const runCb = createQueuedFunction(async context => {
            await hooks.beforeEach.run(context)
            const cbPromise = cb.bind({ context })(context)
            await addTimeoutToPromise(cbPromise, options.timeout)
            await hooks.afterEach.run(context)
        })
        const promise = new Promise(async resolve => {
            const scope = [...parentScope, msg]
            const pendingChildren = []

            const runTest =
                !pattern.length ||
                scope.find(path => pattern.find(_pattern => path.match(_pattern)))

            /** @type {Status} */
            let ownStatus
            let ownErr

            const scopedHooks = createHooksCollection()
            if (runTest) {
                const nestedTest = createTest({
                    parentScope: scope,
                    options,
                    hooks: scopedHooks,
                    createQueuedFunction,
                    emitter,
                    parentPromiseQueue: pendingChildren,
                })
                emitter('addedTest', { scope })
                emitter('startedTest', { scope })

                const context = {
                    file: fileFromScope(scope),
                    scope,
                    test: nestedTest,
                    ...scopedHooks,
                    // expect wrapper that includes a localized "toMatchSnapshot"
                    expect: createExpect(scope),
                }

                Object.assign(
                    context,
                    options.context && (await options.context(context)),
                )

                global.probs.testContext[scope.slice(1).join('//')] = context

                await hooks.beforeAll.runOnce()

                try {
                    await runCb(context)
                    ownStatus = 'pass'
                } catch (e) {
                    ownErr = {
                        ...e,
                        raw: e,
                        text: e.toString && e.toString() || e.message || e.name || '[no error description]',
                        name: e.name,
                        message: e.message,
                        stack: e.stack,
                        json: JSON.parse(JSON.stringify(e)),
                    }
                    ownStatus = 'fail'
                    if (haltOnErrors) {
                        emitter('finishedTest', { scope, status: 'fail', ownErr })
                        throw ownErr
                    }
                }
            } else emitter('finishedTest', { scope, status: 'skipped' })

            const childStatuses = await Promise.all(pendingChildren)
            await scopedHooks.afterAll.run()
            const status = getStatus(...childStatuses.map(s => s.status), ownStatus)
            const result = { scope, ownStatus, ownErr, status }
            emitter('finishedTest', result)
            resolve(result)
        })
        parentPromiseQueue.push(promise)
        return promise
    }
    return test
}
