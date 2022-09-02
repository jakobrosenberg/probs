const TIME_ONE = 1111
const TIME_TWO = 2222

test('option inheritance', probs => {
    probs.options.timeout = TIME_ONE
    test('options are inherited', probs => {
        assert.equal(probs.options.timeout, TIME_ONE)
    })
    test('options can be overwritten', probs => {
        assert.equal(probs.options.timeout, TIME_ONE)
        probs.options.timeout = TIME_TWO
        test('and nearest value is inherited', probs => {
            assert.equal(probs.options.timeout, TIME_TWO)
            test('even in deep nested', probs => {
                assert.equal(probs.options.timeout, TIME_TWO)
            })
        })
    })
})
