import { defaults } from './defaults.js'
import { createHooksCollection } from './utils/misc.js'
import { createExpect } from './utils/expect.js'

/** @returns {Status} */
const statusMap = ['fail', 'pass', 'skipped']
const getStatus = (...statuses) =>
    statuses
        .filter(Boolean)
        .sort((a, b) => statusMap.indexOf(a) - statusMap.indexOf(b))
        .shift()

export const createTest = (
    parentScope = [],
    { options, hooks },
    parentPromiseQueue = [],
) => {
    options = Object.assign({}, defaults, options)
    const { haltOnErrors, reporter, pattern } = options

    const test = async (msg, cb) => {
        const promise = new Promise(async resolve => {
            const scope = [...parentScope, msg]
            const pendingChildren = []

            const runTest =
                !pattern ||
                !pattern.length ||
                scope.find(path => pattern.find(_pattern => path.match(_pattern)))

            /** @type {Status} */
            let ownStatus
            let ownErr

            const scopedHooks = createHooksCollection()
            if (runTest) {
                const nestedTest = createTest(
                    scope,
                    { options, hooks: scopedHooks },
                    pendingChildren,
                )

                reporter.addedTest({ scope })
                reporter.startedTest({ scope })

                await hooks.beforeAll()
                await hooks.beforeEach.run()

                const context = {
                    scope,
                    nestedTest,
                    ...scopedHooks,
                    // expect wrapper that includes a localized "toMatchSnapshot"
                    expect: createExpect(scope),
                }

                Object.assign(
                    context,
                    options.context && (await options.context(context)),
                )

                global.probs.testContext[scope.slice(1).join('//')] = context

                try {
                    await cb.bind({ context })(context)
                    ownStatus = 'pass'
                } catch (e) {
                    ownErr = {
                        ...e,
                        raw: e,
                        text: e.toString(),
                        name: e.name,
                        message: e.message,
                        stack: e.stack,
                        json: JSON.parse(JSON.stringify(e)),
                    }
                    ownStatus = 'fail'
                    if (haltOnErrors) {
                        reporter.finishedTest({ scope, status: 'fail', ownErr })
                        throw ownErr
                    }
                }
            } else reporter.finishedTest({ scope, status: 'skipped' })

            const childStatuses = await Promise.all(pendingChildren)
            await hooks.afterEach.run()
            await scopedHooks.afterAll.run()
            const status = getStatus(...childStatuses.map(s => s.status), ownStatus)
            const result = { scope, ownStatus, ownErr, status }
            reporter.finishedTest(result)
            resolve(result)
        })
        parentPromiseQueue.push(promise)
        return promise
    }
    return test
}
