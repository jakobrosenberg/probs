test('individual globals for each file', () => {
    assert.equal(global.filename, 'test/config-test/config.test.js')
})
test('individual context for each test', (test, ctx) => {
    const expect = 'test/config-test/config.test.js > individual context for each test'
    assert.equal(ctx.scopeString, expect)

    test('also in nested tests', (test, ctx) => {
        const expect = 'test/config-test/config.test.js > individual context for each test > also in nested tests'
        assert.deepEqual(ctx.scopeString, expect)
    })
})