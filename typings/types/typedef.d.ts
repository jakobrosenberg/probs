/**
 * @callback Test
 * @param {string} description
 * @param {(test: Test)=>void} callback
 */
/**
 * @global
 * @type {import('./assertFix')['assert']}
 */
declare let assert: typeof import("./assertFix")['assert'];
/**
 * @global
 * @type {Test}
 */
declare let test: Test;
/**
 * @global
 * @type {Test}
 */
declare let describe: Test;
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
type Test = (description: string, callback: (test: Test) => void) => any;
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
    promise: Promise<any>;
    subscribers: FileItem[];
    teardownDir: Function;
};
type FileItem = {
    file: string;
    options: any;
    dirPromises: DirPromise[];
};
