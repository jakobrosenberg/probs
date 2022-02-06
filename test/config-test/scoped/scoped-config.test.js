test('scoped configs should be available to tests downstream', (ctx)=>{
    assert(ctx.scopedConfig)
    test('also in nested', (ctx) => {
        assert(ctx.scopedConfig)
    })
})