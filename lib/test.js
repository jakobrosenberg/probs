import { defaults } from "./defaults.js"


/** @returns {Status} */
const statusMap = ['fail', 'pass', 'skipped']
const getStatus = (...statuses) => statuses
    .filter(Boolean)
    .sort((a, b) => statusMap.indexOf(a) - statusMap.indexOf(b))
    .shift()


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
            let ownStatus
            let err

            if (runTest) {
                const nestedTest = createTest(scope, options, pendingChildren)

                try {
                    reporter.addedTest({ scope })
                    reporter.startedTest({ scope })
                    await cb(nestedTest)
                    ownStatus = 'pass'
                } catch (e) {
                    err = e
                    ownStatus = 'fail'
                    if (haltOnErrors) {
                        reporter.finishedTest({ scope, status: 'fail', err })
                        throw err
                    }
                }
            }
            else
                reporter.finishedTest({ scope, status: 'skipped' })

            const childStatuses = await Promise.all(pendingChildren)
            const status = getStatus(...childStatuses.map(s => s.status), ownStatus)
            const result = { scope, ownStatus, err, status }
            reporter.finishedTest(result)
            resolve(result)
        })
        parentPromiseQueue.push(promise)
        return promise
    }
    return test
}
