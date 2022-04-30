// import { readFileSync } from 'fs'
// import { analyzeFile } from '../../../lib/utils/analysis/parse.js'
// import { createDirname } from '../../util.js'
// import { SourceMapConsumer } from 'source-map'

// const __dirname = createDirname(import.meta)

// test('can analyze string', async () => {
//     const result = await analyzeFile(__dirname + '/test.sample.js')
//     assert.equal(result.tests.length, 4)
//     assert.deepEqual(result.tests[0].scope, ['foo'])
//     assert.deepEqual(result.tests[1].scope, ['foo', 'bar'])
//     assert.deepEqual(result.tests[2].scope, ['foo', 'bar', 'baz'])
//     assert.deepEqual(result.tests[3].scope, ['foo', 'sibling'])
// })


// test('can transform file', async () => {
//     const original = readFileSync(__dirname + '/test.sample.js', 'utf-8')

//     const { content, sourcemap } = await _transform(original, 'test.sample.js')

//     // 4 tests with 6 added lines in each
//     const addedLength = 4 * 6
//     assert.equal(
//         content.split(/\r?\n/).length,
//         original.split(/\r?\n/).length + addedLength,
//     )

//     const consumer = await new SourceMapConsumer(sourcemap.toString())

//     assert.deepEqual(consumer.originalPositionFor({ line: 7, column: 10 }), {
//         source: 'test.sample.js',
//         line: 1,
//         column: 19,
//         name: null,
//     })
// })

// test('can access variables added by transform', () => {
//     // @ts-ignore
//     assert.equal(test, PROBS_CONTEXT.test)
//     test('scopes work in nested tests', () => {
//         // @ts-ignore
//         assert.deepEqual(PROBS_CONTEXT.scope, [
//             'test/old/utils/analysis.test.js',
//             'can access variables added by transform',
//             'scopes work in nested tests',
//         ])
//     })
// })
