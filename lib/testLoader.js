// used with --experimental-loader

import { analyzeStr } from './analysis/parse.js'
import { fileURLToPath } from 'url'
import MagicString from 'magic-string'

/**
 * @param {string} content
 */
export const _transform = async (content, file = 'na') => {
    const magicString = new MagicString(content)
    const analysis = await analyzeStr(content)
    const tests = [...analysis.tests].reverse()
    tests.forEach(test => {
        // Split location where we insert context code. +1 because we're jumping over the "{"
        const splitPos = test.body.start + 1

        // set padding
        const match = content.substring(splitPos + 1).match(/^[ \t]+/)
        const padding = (match && match[0]) || ''

        const insert = [
            '',
            '/* start of compiled probs code */',
            `const PROBS_CONTEXT = global.probs.testContext['${test.scope.join('//')}']`,
            `let test = PROBS_CONTEXT.test`,
            `let expect = PROBS_CONTEXT.expect`,
            '/* end of compiled probs code */',
            '',
        ].join('\r\n' + padding)

        magicString.prependRight(splitPos, insert)
    })

    const map = magicString.generateMap({ includeContent: true, source: file })
    return { content: magicString.toString(), sourcemap: map }
}

export async function transformSource(source, opts) {
    if (
        opts.url.endsWith(process.env.__probsTestFile) ||
        opts.url.match(/\.(test|spec)\.js$/)
    ) {
        const { content, sourcemap } = await _transform(
            source.toString(),
            fileURLToPath(opts.url),
        )
        source = content + '\r\n\r\n' + '//# sourceMappingURL=' + sourcemap.toUrl()

        return { source }
    }
    return { source }
}
