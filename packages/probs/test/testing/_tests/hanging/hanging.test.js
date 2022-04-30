test('I hang a little', async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
})
test('I hang too much', async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
})
test('I also hang a little', async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
})
