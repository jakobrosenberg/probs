import { normalizePatterns, scopeMatchesPattern } from '../index.js'

test('can normalize pattern', () => {
    const a = normalizePatterns('myfile//my test//my nested test;;myfile2//my 2nd test')
    const b = normalizePatterns([
        'myfile//my test//my nested test',
        'myfile2//my 2nd test',
    ])
    const expect = [
        ['myfile', 'my test', 'my nested test'],
        ['myfile2', 'my 2nd test'],
    ]
    assert.deepEqual(a, expect)
    assert.deepEqual(b, expect)
})

test('can match pattern', () => {
    const scope = ['path/to/myfile.js', 'my test', 'my nested test', 'deeply nested']
    const matchingPattern = ['myfile', '', 'my nested test']
    const notMatchingPattern = ['badfile', '', 'my nested test']
    
    test('no pattern matches everything', () => {
        const result = scopeMatchesPattern(scope, '')
        assert(result)
    })
    test('good pattern matches', () => {
        const result = scopeMatchesPattern(scope, [matchingPattern])
        assert(result)
    })
    test('bad pattern matches not', () => {
        const result = scopeMatchesPattern(scope, [notMatchingPattern])
        assert(!result)
    })
    test('multiple patterns matches if one matches', () => {
        const result = scopeMatchesPattern(scope, [matchingPattern, notMatchingPattern])
        assert(result)
    })
})
