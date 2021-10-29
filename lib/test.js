import { defaults } from "./defaults.js"

const createQueue = (async) => {
    let activateDynamicPromise
    const pendingJobs = []
    const runningJobs = []
    let isProcessing = false

    const asyncRun = async (job) => {
        pendingJobs.push(job)
        if (!isProcessing) {
            isProcessing = true
            while (pendingJobs.length) {
                const promise = pendingJobs.shift()()
                runningJobs.push(promise)
                await promise
            }
            isProcessing = false
        }
    }

    const queue = (job) => {
        if (async) asyncRun(job)
        else runningJobs.push(job())
        activateDynamicPromise()
    }

    const dynamicPromiseAll = new Promise(async resolve => {
        await new Promise(_resolve => activateDynamicPromise = _resolve)
        let job
        while (job = runningJobs.shift()) await job
        resolve()
    })

    // create a promise on the queue    
    queue.then = dynamicPromiseAll.then.bind(dynamicPromiseAll)

    return queue
}

export const createTestRunner = (async, parentScope = [], options = {}) => {    
    options = Object.assign({}, defaults, options)
    const { haltOnErrors, reporter, pattern } = options
    const queue = createQueue(async)

    const test = (msg, cb) => {
        const scope = [...parentScope, msg]
        const runTest = !pattern || !pattern.length ||
            scope.find(path => pattern.find(_pattern => path.match(_pattern)))

        if (runTest)
            queue(async () => {
                const test = createTestRunner(false, scope, options)
                const asyncTest = createTestRunner(true, scope, options)

                try {
                    reporter.startedTest({ scope })
                    await cb({ test, asyncTest })
                    reporter.finishedTest({ scope, status: 'pass' })
                } catch (err) {
                    reporter.finishedTest({ scope, status: 'fail', err })
                    if (haltOnErrors)
                        throw err
                }
            })
        else
            reporter.finishedTest({ scope, status: 'skipped' })
    }
    test.then = queue.then
    return test
}
