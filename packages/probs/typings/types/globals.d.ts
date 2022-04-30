/**
 * @global
 * @type {import('./assertFix')['assert']}
 */
declare let assert: typeof import("./assertFix")['assert'];
/**
 * @global
 * @type {import('expect/build/types').Expect}
 */
declare let expect: import('expect/build/types').Expect;
/**
 * @global
 * @type {TestCb}
 */
declare let test: TestCb;
/**
 * @global
 * @type {TestCb}
 */
declare let describe: TestCb;
/**
 * @global
 * @type {(Function)=>{}}
 */
declare let beforeAll: (Function: any) => {};
/**
 * @global
 * @type {(Function)=>{}}
 */
declare let beforeEach: (Function: any) => {};
/**
 * @global
 * @type {(Function)=>{}}
 */
declare let afterAll: (Function: any) => {};
/**
 * @global
 * @type {(Function)=>{}}
 */
declare let afterEach: (Function: any) => {};
/**
 * @global
 * @type {any}
 */
declare let PROBS_CONTEXT: any;
