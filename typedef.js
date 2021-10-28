/**
 * @callback Test
 * @param {string} description
 * @param {({test: Test, asyncTest:AsyncTest})=>void} callback
 */

/**
 * @callback AsyncTest
 * @param {string} description
 * @param {({test: Test, asyncTest:AsyncTest})=>Promise<void>} callback
 */


/**
 * @global
 * @type {AsyncTest}
 */
let asyncTest

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