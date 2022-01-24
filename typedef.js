/**
 * @callback Test
 * @param {string} description
 * @param {(test: Test)=>void} callback
 */

/**
 * @global
 * @type {Test}
 */
let test

/**
 * @global
 * @type {import('assert')}
 */
let assert

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
 * @prop {function({file:string})} worker
 * @prop {function(string)} setupFile
 * @prop {function(string)} teardownFile
 * @prop {function(ProbsConfigContextCtx):ProbsConfigContextCtx} context
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
