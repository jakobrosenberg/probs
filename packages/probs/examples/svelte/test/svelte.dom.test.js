
import DomComponent from './Component.svelte'
import { tick } from 'svelte'
import { JSDOM } from 'jsdom'

const expectedHtml = count =>
    '<button id="+">+</button>' +
    ' <button id="-">-</button>' +
    ` <h1>count: ${count}</h1>`

test('can read svelte files in dom mode', () => {
    const { window } = new JSDOM('', { url: 'http://test' });
    Object.assign(global, window)
    
    test('can run in jsdom', () => {
        new DomComponent({ target: document.body })
        assert.equal(document.body.innerHTML, expectedHtml(0))
    })
    test('files can render', async () => {
        const event = new window.Event('click')
        document.getElementById('+').dispatchEvent(event)
        await tick()
        assert.equal(document.body.innerHTML, expectedHtml(1))
    })
})