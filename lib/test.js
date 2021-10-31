import { defaults } from "./defaults.js"
import { getPrevailingStatus } from "./reporters/consoleReporter/utils.js"

export const createTest = (parentScope = [], options = {}, parentPromiseQueue = []) => {
    options = Object.assign({}, defaults, options)
    const { haltOnErrors, reporter, pattern } = options

    const test = async (msg, cb) => {
        const promise = new Promise(async (resolve) => {
            const scope = [...parentScope, msg]
            const pendingChildren = []

            const runTest =
                !pattern ||
                !pattern.length ||
                scope.find(path => pattern.find(_pattern => path.match(_pattern)))

            /** @type {Status} */
            let status
            let err

            if (runTest) {
                const nestedTest = createTest(scope, options, pendingChildren)

                try {
                    reporter.addedTest({ scope })
                    reporter.startedTest({ scope })
                    await cb(nestedTest)
                    status = 'pass'
                } catch (e) {
                    err = e
                    status = 'fail'
                    if (haltOnErrors) {
                        reporter.finishedTest({ scope, status: 'fail', err })
                        throw err
                    }
                }
            }
            else
                reporter.finishedTest({ scope, status: 'skipped' })

            const childStatuses = await Promise.all(pendingChildren)
            const prevailingStatus = getPrevailingStatus(...childStatuses.map(s => s.prevailingStatus), status)
            const result = { scope, status, err, prevailingStatus }
            reporter.finishedTest(result)
            resolve(result)
        })
        parentPromiseQueue.push(promise)
        return promise
    }
    return test
}
