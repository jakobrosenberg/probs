import { delay } from "../../util.js"

let status = '1original'

// todo hooks should access and provide context

beforeEach(() => {
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
       assert.equal(status, '1original>2beforeAll>rootBefore>rootBefore>rootBefore>3beforeAllNested>rootAfter>4nestedAfterAll>5second>rootAfter>6third>rootAfter')
})

test('before-all runs before all', ({ beforeAll, afterAll }) => {
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
    status += '>5second'
})

test('third root test', async () => {
    await delay(200)
    status += '>6third'
})