/**
 * @typedef {Object} TestCbPayloadFields
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
 * @callback TestCb
 * @param {string} description
 * @param {(TestCbPayload)=>void} callback
 */
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
type TestCbPayloadFields = {
    file: {
        path: string;
        relativePath: string;
        dir: string;
        relativeDir: string;
    };
    expect: import('expect/build/types').Expect;
};
type TestCbPayload = TestCbPayloadFields & Hooks;
type TestCb = (description: string, callback: (TestCbPayload: any) => void) => any;
type Status = "fail" | "pass" | "skipped";
type State = "pending" | "started" | "finished";
type Scope = string[];
type ProbsConfigContextCtx = {
    scope: string[];
};
type ProbsConfigOptions = {
    testConcurrencyMode: 'serial' | 'parallel';
    worker: ({ file: string }: {
        file: any;
    }) => WorkerOptions | import("child_process").ForkOptions;
    setupFile: (string: any) => any;
    teardownFile: (string: any) => any;
    context: (arg0: ProbsConfigContextCtx) => ProbsConfigContextCtx;
    glob: string;
    haltOnErrors: boolean;
    runner: 'worker' | 'fork';
    ignore: string[] | string;
    concurrency: number;
};
type ProbsConfig = Partial<ProbsConfigOptions>;
type DirPromise = {
    setupPromise: Promise<any>;
    children: FileItem[];
    teardownDir: Function;
};
type FileItem = {
    file: string;
    options: any;
};
type ProbEvents = 'addedFile' | 'addedTest' | 'finishedTest' | 'startedTest' | 'openedFile' | 'closedFile' | 'finishedAllTests';
type ProbsEmitterCb = (eventName: ProbEvents, params: any) => any;
type ProbsEmitter = ProbsEmitterCb;
type HookPayloadFields = {
    scope: string[];
    state?: any;
    fileItem?: FileItem | undefined;
};
type HookPayload = HookPayloadFields & {
    [x: string]: any;
};
type ProbsOptions = {
    reporter: string | ProbsPlugin;
    runner: 'worker' | 'fork' | 'main';
    haltOnErrors: boolean;
    glob: string;
    ignore: string;
    concurrency: number;
    globals: boolean;
    path?: (string | string[]) | undefined;
    timeout?: number | undefined;
    pattern: string[];
    worker?: ({ file: string }: {
        file: any;
    }) => import('worker_threads').WorkerOptions;
};
type ProbsPlugin = (probs: any) => any;
type ProbsRunner = (probs: any, file: string, options: ProbsOptions) => any;
type Probs = any;
type CreateHooksCollection = typeof import("../lib/utils/misc.js")['createHooksCollection'];
type Hooks = {
    beforeAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    afterAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    beforeEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    afterEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
};
