/**
 * @typedef {Object} TestCbPayloadFields
 * @prop {string[]} scope
 * @prop {import('expect/build/types').Expect} expect
 * @prop {{
 *  path: string,
 *  relativePath: string,
 *  dir: string,
 *  relativeDir: string
 * }} file
 *
 * @typedef {TestCbPayloadFields & Hooks & {options: Partial<ProbsOptions & ProbsConfig>}} TestCbPayload
 */

/**
 * @typedef {import('../lib/Framework/StateManager').TestState} TestState
 */

/**
 * @callback TestCb
 * @param {string} description
 * @param {(ctx: TestCbPayload)=>void} callback
 */

/**
 * @callback TestCbWithOptions
 * @param {string} description
 * @param {Partial<ProbsOptions>} options
 * @param {(ctx: TestCbPayload)=>void} callback
 */

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
 * @typedef {Partial<ProbsConfigOptions>} ProbsConfig
 */

/**
 * @typedef {object} DirPromise
 * @prop {Promise} setupPromise
 * @prop {FileItem[]} children
 * @prop {function} teardownDir
 */

/**
 *  @typedef {object} FileItem
 *  @prop {string} file
 *  @prop {any} options
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
 * @prop {import('../lib/Framework/StateManager').TestState=} state
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
 * @prop {'all'|'new'|'none'} updateSnapshots
 * @prop {boolean} globals
 * @prop {string|string[]=} path
 * @prop {number=} timeout
 * @prop {string[]} pattern
 * @prop {boolean} watch
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
 * @param {Partial<ProbsOptions & ProbsConfig>} options
 */

/**
 * @typedef {import('../lib/Framework/probs.js').Probs} Probs
 */

/**
 * @typedef {import('../lib/utils/misc.js')['createHooksCollection']} CreateHooksCollection
 * @typedef {CreateHooksCollection extends(...args: any[]) => infer U ? U : any} Hooks
 */
