import { delay } from "../util.js"

let status = '1original'

// todo hooks should access and provide context

beforeEach(() => {
    console.log('in before each')
    status += '>rootBefore'
})
afterEach(()=>{
    status += '>rootAfter'
})

beforeAll(async () => {
    await delay(50)
    status += '>2beforeAll'
})
afterAll(async () => {
    console.log('bar')
       assert.equal(status, '1original>2beforeAll>rootBefore>rootBefore>rootBefore>3beforeAllNested>rootAfter>4nestedAfterAll>5second>rootAfter>6third>rootAfter')
})

test('before-all runs before all', (test, { beforeAll, afterAll }) => {
    afterAll(async () => {
        status += '>4nestedAfterAll'
    })

    beforeAll(async () => {
        await delay(30)
        status += '>3beforeAllNested'
    })

    assert.equal(status, '1original>2beforeAll>rootBefore>rootBefore>rootBefore')

    test('before-all from context runs in nested tests', () => {
        assert.equal(status, '1original>2beforeAll>rootBefore>rootBefore>rootBefore>3beforeAllNested')
    })
})

test('second root test', async () => {
    await delay(100)
    console.log('foo2')
    status += '>5second'
})

test('third root test', async () => {
    await delay(200)
    console.log('foo3')
    status += '>6third'
})