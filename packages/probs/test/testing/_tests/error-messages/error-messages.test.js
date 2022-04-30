test('I throw an error', () => {
    throw new Error('I failed')
})

test('My child throws an error', () => {
    test('I throw an error', () => {
        throw new Error('I failed')
    })
})

test('My grandchild throws an error', () => {
    test('My child throws an error', () => {
        test('I throw an error', () => {
            throw new Error('I failed')
        })
    })
})

test('My child and I throw errors', ()=>{
    test('I throw an error', () => {
        throw new Error('Child failed')
    })
    throw new Error('Parent failed')
})