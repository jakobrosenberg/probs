import { delay } from "../util.js"

let status = '1original'

beforeAll(async () => {
    await delay(50)
    status += '>2beforeAll'
})
afterAll(async () => {
    assert.equal(status, '1original>2beforeAll>3beforeAllNested>4nestedAfterAll>5second>6third')
})

test('before-all runs before all', (test, { beforeAll, afterAll }) => {
    afterAll(async () => {
        status += '>4nestedAfterAll'
    })

    beforeAll(async () => {
        await delay(30)
        status += '>3beforeAllNested'
    })

    assert.equal(status, '1original>2beforeAll')

    test('before-all from context runs in nested tests', () => {
        assert.equal(status, '1original>2beforeAll>3beforeAllNested')
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