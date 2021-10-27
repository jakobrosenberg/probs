
const order = []
test('test ignores async', async ({ test, asyncTest }) => {

    test('child1', async () => {
        await new Promise(resolve => setTimeout(() => {
            order.push('foo')
            console.log('in foo')
            resolve()
            console.log(123)
        }, 300))
    })

    test('child2', async () => {
        await new Promise(resolve => setTimeout(() => {
            order.push('bar')
            console.log('in bar')
            resolve()
        }, 200))
    })

    test('child2', async () => {
        await new Promise(resolve => setTimeout(() => {
            order.push('baz')
            console.log('in baz', Date.now())
            resolve()
        }, 100))
    })

    await test
    console.log(order, Date.now())

})