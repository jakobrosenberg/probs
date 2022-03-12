/**
 * @typedef {Object} TestCbPayloadFields
 * @prop {Test} test
 * @prop {{
 *  path: string,
 *  relativePath: string,
 *  dir: string,
 *  relativeDir: string
 * }} file
 * @prop {import('expect/build/types').Expect} expect
 * 
 * @typedef {TestCbPayloadFields & Hooks} TestCbPayload
 */

/**
 * @callback Test
 * @param {string} description
 * @param {(TestCbPayload)=>void} callback
 */

/**
 * @global
 * @type {import('./assertFix')['assert']}
 */
let assert

/**
 * @global
 * @type {import('expect/build/types').Expect}
 */
let expect

/**
 * @global
 * @type {Test}
 */
let test

/**
 * @global
 * @type {Test}
 */
let describe

/**
 * @global
 * @type {(Function)=>{}}
 */
let beforeAll

/**
 * @global
 * @type {(Function)=>{}}
 */
let beforeEach

/**
 * @global
 * @type {(Function)=>{}}
 */
let afterAll

/**
 * @global
 * @type {(Function)=>{}}
 */
let afterEach

/**
 * @global
 * @type {any}
 */
let PROBS_CONTEXT

/**
 *  @typedef {"fail"|"pass"|"skipped"} Status
 *  @typedef {"pending"|"started"|"finished"} State
 *  @typedef {string[]} Scope
 **/

/**
 * @typedef {object} ProbsConfigContextCtx
 * @prop {string[]} scope
 */

/**
 * @typedef {object} ProbsConfigOptions
 * @prop {'serial'|'parallel'} testConcurrencyMode
 * @prop {({file:string})=>WorkerOptions|import("child_process").ForkOptions} worker
 * @prop {(string)=>any} setupFile
 * @prop {(string)=>any} teardownFile
 * @prop {function(ProbsConfigContextCtx):ProbsConfigContextCtx} context
 *
 * @prop {string} glob
 * @prop {boolean} haltOnErrors
 * @prop {'worker'|'fork'} runner
 * @prop {string[]|string} ignore
 * @prop {number} concurrency
 */

/**
 * @typedef {Partial<ProbsConfigOptions>} ProbsConfig
 */

/**
 * @typedef {object} DirPromise
 * @prop {Promise} promise
 * @prop {FileItem[]} subscribers
 * @prop {function} teardownDir
 */

/**
 *  @typedef {object} FileItem
 *  @prop {string} file
 *  @prop {any} options
 *  @prop {DirPromise[]} dirPromises
 */

/**
 *  @typedef { 'addedFile'| 'addedTest'| 'finishedTest'| 'startedTest'| 'openedFile'| 'closedFile'| 'finishedAllTests'} ProbEvents
 **/

/**
 * @callback ProbsEmitterCb
 * @param {ProbEvents} eventName
 * @param {any} params
 */

/**
 * @typedef {ProbsEmitterCb} ProbsEmitter
 */

/**
 * @typedef {Object} HookPayloadFields
 * @prop {string[]} scope
 * @prop {import('../lib/helpers/state.js').TestState=} state
 * @prop {FileItem=} fileItem
 */

/**
 * @typedef {HookPayloadFields & Object.<string, any>} HookPayload
 */

/**
 * @typedef {Object} ProbsOptions
 * @prop {string|ProbsPlugin}  reporter
 * @prop {'worker'|'fork'|'main'} runner
 * @prop {boolean} haltOnErrors
 * @prop {string} glob
 * @prop {string} ignore
 * @prop {number} concurrency
 * @prop {boolean} globals
 * @prop {string=} path
 * @prop {({ file: string })=>import('worker_threads').WorkerOptions=} worker
 */

/**
 * @callback ProbsPlugin
 * @param {Probs} probs
 */

/**
 * @callback ProbsRunner
 * @param {Probs} probs
 * @param {string} file
 * @param {ProbsOptions} options
 */

/**
 * @typedef {import('../lib/probs.js').Probs} Probs
 */

/**
 * @typedef {import('../lib/utils/misc.js')['createHooksCollection']} CreateHooksCollection
 * @typedef {CreateHooksCollection extends(...args: any[]) => infer U ? U : any} Hooks
*/

