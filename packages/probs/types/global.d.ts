/// <reference path="./typedef.js" />

declare function test(name: string, callback:(ctx: TestCbPayload)=>any):any
declare function test(name: string, options: Partial<ProbsOptions>, callback:(ctx: TestCbPayload)=>any):any
declare const describe: typeof test
declare const it: typeof test

declare const beforeAll: (Function)=>any
declare const afterAll: (Function)=>any 
declare const beforeEach: (Function)=>any
declare const afterEach: (Function)=>any

declare const assert: typeof import('./assertFix')['assert']
declare const expect: import('expect/build/types').Expect
 