/**
 * @callback Test
 * @param {string} description
 * @param {(test: Test)=>void} callback
 */

/**
 * @global
 * @type {import('./assertFix')['assert']}
 */
let assert

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
 * @prop {({file:string})=>any} worker
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
