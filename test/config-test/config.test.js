test('individual globals for each file', () => {
    assert.equal(global.filename, 'test/config-test/config.test.js')
})
test('individual context for each test', (test, ctx) => {
    const expects = 'test/config-test/config.test.js > individual context for each test'
    assert.equal(ctx.scopeString, expects)

    test('also in nested tests', (test, ctx) => {
        const expects = 'test/config-test/config.test.js > individual context for each test > also in nested tests'
        assert.deepEqual(ctx.scopeString, expects)
    })
})