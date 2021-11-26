/**
 * @callback Test
 * @param {string} description
 * @param {(test: Test)=>void} callback
 */
/**
 * @global
 * @type {Test}
 */
declare let test: Test;
/**
 * @global
 * @type {import('assert')}
 */
declare let assert: any;
type Test = (description: string, callback: (test: Test) => void) => any;
type Status = "fail" | "pass" | "skipped";
type State = "pending" | "started" | "finished";
type Scope = string[];
