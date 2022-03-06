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
    const qfWrapper = createQueuedFunctionWrapper()
    const foo = val => val + val
    const wrappedFoo = qfWrapper(foo)
    const result = await wrappedFoo('foo')
    assert.equal(result, 'foofoo')
})

test('createQueuedFunctionWrapper functions run in correct order', async () => {
    const qfWrapper = createQueuedFunctionWrapper()
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

test('createQueuedFunctionWrapper functions can run in parallel', async () => {
    const qfWrapper = createQueuedFunctionWrapper('parallel')
    let results = []
    const promises = [
        qfWrapper(createDelayedFn)(60, () => results.push(1)),
        qfWrapper(createDelayedFn)(40, () => results.push(2)),
        qfWrapper(createDelayedFn)(20, () => results.push(3)),
        qfWrapper(createDelayedFn)(0, () => results.push(4)),
    ]
    await Promise.all(promises)
    assert.deepEqual(results, [4, 3, 2, 1])
})
