const events = []

beforeAll(() => {
    events.push('beforeAll')
})

beforeEach(({ scope }) => {
    events.push('beforeEach-' + scope[1])
})

afterAll(() => {
    events.push('afterAll')
})

afterEach(({ scope }) => {
    events.push('afterEach-' + scope[1])
})

test('root1', () => {
    test('child1', () => {})
    test('child2', () => {})
})

test('root2', () => {
    test('child1', () => {})
    test('child2', () => {})
})

test('verify events', () => {
    assert.deepEqual(events, [
        'beforeAll',
        'beforeEach-root1',
        'afterEach-root1',
        'beforeEach-root2',
        'afterEach-root2',
        'beforeEach-verify events',
    ])
})

// todo nested hooks are only available through test('mytest', ({hooks})=>{}), but should work without manually getting hook from context