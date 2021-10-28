import { delay } from "./util.js"

let str = ''

asyncTest('wait for A', async () => {
    await delay(100)
    str += 'a'
    assert.equal(str, 'a')
})

asyncTest('wait for B', async () => {
    await delay(80)
    str += 'b'
    assert.equal(str, 'ab')
})
asyncTest('wait for C', async () => {
    await delay(60)
    str += 'c'
    assert.equal(str, 'abc')
})
asyncTest('wait for D', async () => {
    await delay(40)
    str += 'd'
    assert.equal(str, 'abcd')
})