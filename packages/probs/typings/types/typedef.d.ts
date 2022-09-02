type TestCbPayloadFields = {
    scope: string[];
    expect: import('expect/build/types').Expect;
    file: {
        path: string;
        relativePath: string;
        dir: string;
        relativeDir: string;
    };
};
type TestCbPayload = TestCbPayloadFields & Hooks & {
    options: Partial<ProbsOptions & ProbsConfig>;
};
type TestState = import('../lib/Framework/StateManager').TestState;
type TestCb = (description: string, callback: (ctx: TestCbPayload) => void) => any;
type Status = "fail" | "pass" | "skipped";
type State = "pending" | "started" | "finished";
type Scope = string[];
type ProbsConfigContextCtx = {
    scope: string[];
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
    state?: import('../lib/Framework/StateManager').TestState | undefined;
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
    updateSnapshots: 'all' | 'new' | 'none';
    globals: boolean;
    path?: (string | string[]) | undefined;
    timeout?: number | undefined;
    pattern: string[];
    watch: boolean;
    worker?: ({ file: string }: {
        file: any;
    }) => import('worker_threads').WorkerOptions;
};
type ProbsPlugin = (probs: Probs) => any;
type ProbsRunner = (probs: Probs, file: string, options: Partial<ProbsOptions & ProbsConfig>) => any;
type Probs = import('../lib/Framework/probs.js').Probs;
type CreateHooksCollection = typeof import("../lib/utils/misc.js")['createHooksCollection'];
type Hooks = {
    beforeAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    afterAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    beforeEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    afterEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
};
