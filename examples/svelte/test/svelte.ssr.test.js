import SsrComponent from './Component.svelte?generate=ssr'

const expectedHtml = count =>
    '<button id="+">+</button>' +
    '\n<button id="-">-</button>' +
    `\n\n<h1>count: ${count}</h1>`

test('can read svelte files in ssr mode', test => {
    test('files have render method', () => {
        assert(SsrComponent.render)
    })
    test('files can render html', () => {
        assert.equal(SsrComponent.render().html, expectedHtml(0))
    })
})
