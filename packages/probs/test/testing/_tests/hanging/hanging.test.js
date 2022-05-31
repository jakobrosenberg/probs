test('I hang a little', async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
})
test('I hang too much', async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
})
test('I also hang a little', async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
})

test('nested tests dont count toward parent timeout', async ()=>{
    const startedAt = Date.now()
    test('short test', async()=>{
        await new Promise(resolve => setTimeout(resolve, 100))        
    })
    test('short test', async()=>{
        await new Promise(resolve => setTimeout(resolve, 100))        
    })
    test('short test', async()=>{
        await new Promise(resolve => setTimeout(resolve, 100))        
        const duration = Date.now() - startedAt
        assert(duration > 300)
        assert(duration < 400)
    })
})