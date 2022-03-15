import { _transform } from '../../testLoader.js'

test('can transform test with block', async () => {
    const str = `
    test('test with block', () => {
        assert(true)
    })
    `

    const result = await _transform(str)

    assert.equal(
        result.content,
        "\n"+
        "    test('test with block', () => {\r\n" +
        '  /* start of compiled probs code */\r\n' +
        "  const PROBS_CONTEXT = global.probs.testContext['test with block']\r\n" +
        '  let test = PROBS_CONTEXT.test\r\n' +
        '  let expect = PROBS_CONTEXT.expect\r\n' +
        '  /* end of compiled probs code */\r\n' +
        '  {\r\n' +
        '    {\n' +
        '        assert(true)\n' +
        '    }\r\n' +
        '}})\n' +
        '    '
    )
})

test('can transform test without block', async () => {
    const str = `
    test('test with block', () => assert(true))
    `

    const result = await _transform(str)

    assert.equal(
        result.content,
        [
            `\n    test('test with block', () => {`,
            `  /* start of compiled probs code */`,
            `  const PROBS_CONTEXT = global.probs.testContext['test with block']`,
            `  let test = PROBS_CONTEXT.test`,
            `  let expect = PROBS_CONTEXT.expect`,
            `  /* end of compiled probs code */`,
            `  {`,
            `    assert(true)`,
            `}})\n    `,
        ].join('\r\n'),
    )
})
