import { createQueuedFunctionWrapper } from '../misc.js'
import { QueueManager } from '../QueueManager.js'

const createDelayedFn = async (time, cb) => {
    await new Promise(resolve => setTimeout(resolve, time))
    return cb()
}
// const createDelayedFnReject = (time, returnValue) =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => reject(returnValue), time)
//     })

test('createQueuedFunctionWrapper returns a wrapper function', async () => {
    const qfWrapper = createQueuedFunctionWrapper('atCall')
    const foo = val => val + val
    const wrappedFoo = qfWrapper(foo)
    const result = await wrappedFoo('foo')
    assert.equal(result, 'foofoo')
})

test('createQueuedFunctionWrapper functions run in correct order using atCall', async () => {
    const qfWrapper = createQueuedFunctionWrapper('atCall')
    let results = []
    const promises = [
        qfWrapper(createDelayedFn)(50, () => results.push(1)),
        qfWrapper(createDelayedFn)(30, () => results.push(2)),
        qfWrapper(createDelayedFn)(10, () => results.push(3)),
        qfWrapper(createDelayedFn)(0, () => results.push(4)),
    ]
    await Promise.all(promises)
    assert.deepEqual(results, [1, 2, 3, 4])
})

test('createQueuedFunctionWrapper functions run in correct order atCreate', async () => {
    const qfWrapper = createQueuedFunctionWrapper('atCreate')
    let results = []

    const q1 = qfWrapper(createDelayedFn)
    const q2 = qfWrapper(createDelayedFn)
    const q3 = qfWrapper(createDelayedFn)
    const q4 = qfWrapper(createDelayedFn)

    assert.equal(qfWrapper.queue.length, 4)

    // execute functions in random order
    const promises = [
        q2(0, () => results.push(2)),
        q4(10, () => results.push(4)),
        q1(20, () => results.push(1)),
        q3(30, () => results.push(3)),
    ]

    await Promise.all(promises)

    // expect functions to be executed in order of creation, not order of call
    assert.deepEqual(results, [1, 2, 3, 4])
    assert.equal(qfWrapper.queue.length, 0)
})

test('queueManager works', async () => {
    const queueManager = new QueueManager(2)

    const queueAFunction = (returnValue, delay) =>
        queueManager.push(
            () =>
                new Promise(resolve =>
                    setTimeout(() => {
                        resolve(returnValue)
                    }, delay),
                ),
        )

    queueAFunction('foo', 200)
    queueAFunction('bar', 100)
    const result = queueAFunction('baz', 50)
    const startTime = Date.now()
    await result.resolved
    const endTime = Date.now()
    const duration = endTime - startTime
    // we expect around 150 because the test lasts 50 ms and the first free slot is available at 100 ms
    assert(duration < 190 && duration >= 150, `duration should be < 190 and >= 150. It was ${duration}`)
    
})

test('queueManager works in single sequence', async ()=>{
    const queueManager = new QueueManager(1)

    const queueAFunction = (returnValue, delay) =>
        queueManager.push(
            () =>
                new Promise(resolve =>
                    setTimeout(() => {
                        resolve(returnValue)
                    }, delay),
                ),
        )

    queueAFunction('foo', 200)
    queueAFunction('bar', 100)
    const result = queueAFunction('baz', 50)
    const startTime = Date.now()
    await result.resolved
    const endTime = Date.now()
    const duration = endTime - startTime
    // we expect around 150 because the test lasts 50 ms and the first free slot is available at 100 ms
    assert(duration < 400 && duration >= 350, `duration should be < 400 and >= 350. It was ${duration}`)
})