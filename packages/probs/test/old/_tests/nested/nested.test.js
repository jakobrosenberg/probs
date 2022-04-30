import { delay } from "../../../util.js"

test('tests waits for child tests', async () => {
    let status = ''

    await test('I\'m asynchronous', () => {
        test('I\'m synchronous', () => {
            test('I\'m synchronous, but my callback is async 50 ms - wait for me', async () => {
                await delay(50)
                status += ' 50'
            })
            test('I\'m synchronous, but my callback is async 25 ms - wait for me', async () => {
                await delay(25)
                status += ' 25'
            })
            test('I\'m synchronous, but my callback is async 0 ms - wait for me', async () => {
                await delay(0)
                status += '0'
            })
        })

    })

    test('I should run after Asynchronous and print "0 25 50"', () => {
        assert.equal(status, '0 25 50')
    })
})
