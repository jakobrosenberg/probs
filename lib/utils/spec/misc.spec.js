import { createQueuedFunctionWrapper } from '../misc.js'

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
