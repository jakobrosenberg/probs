test('can use expect', ()=>{
    assert.ok(expect)
    expect('foo').toBe('foo')

    test('can use snapshot', ()=>{
        assert.ok(expect)
        assert.ok(expect('foo').toMatchSnapshot)
        expect('foo').toMatchSnapshot()
    })
})