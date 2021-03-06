test('individual globals for each file', () => {
    assert.equal(global.filename, 'test/old/config-test/config.test.js')
})
test('individual context for each test', (ctx) => {
    const expects = 'test/old/config-test/config.test.js > individual context for each test'
    assert.equal(ctx.scopeString, expects)

    test('also in nested tests', (ctx) => {
        const expects = 'test/old/config-test/config.test.js > individual context for each test > also in nested tests'
        assert.deepEqual(ctx.scopeString, expects)
    })
})