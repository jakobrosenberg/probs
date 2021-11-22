test('scoped configs should be available to tests downstream', (test, ctx)=>{
    assert(ctx.scopedConfig)
    test('also in nested', (test, ctx) => {
        assert(ctx.scopedConfig)
    })
})