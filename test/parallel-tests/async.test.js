import { delay } from "../util.js"

let str = ''

test('run async tests', async ()=>{
    await test('wait for A', async () => {
        await delay(100)
        str += 'a'
        assert.equal(str, 'a')
    })
    
    await test('wait for B', async () => {
        await delay(80)
        str += 'b'
        assert.equal(str, 'ab')
    })
    await test('wait for C', async () => {
        await delay(60)
        str += 'c'
        assert.equal(str, 'abc')
    })
    await test('wait for D', async () => {
        await delay(40)
        str += 'd'
        assert.equal(str, 'abcd')
    })
})

