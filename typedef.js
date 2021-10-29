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


/** @typedef {"fail"|"pass"|"skipped"} Status */
