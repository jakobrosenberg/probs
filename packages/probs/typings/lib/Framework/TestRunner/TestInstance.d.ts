/// <reference types="node" />
/**
 * The instance of a single test
 */
export class TestInstance {
    /**
     * @param {string} name
     * @param {(ctx: TestCbPayload)=>void} callback
     * @param {import('./TestFile').TestFile} testFile
     * @param {Partial<ProbsOptions & ProbsConfig>} options
     * @param {TestInstance=} parent
     */
    constructor(name: string, callback: (ctx: TestCbPayload) => void, testFile: import('./TestFile').TestFile, options: Partial<ProbsOptions & ProbsConfig>, parent?: TestInstance | undefined);
    /** @type { TestInstance[] } */
    children: TestInstance[];
    status: any;
    ownStatus: any;
    ownErr: any;
    comments: any[];
    hooks: {
        beforeAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        afterAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        beforeEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        afterEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    };
    get scope(): any;
    globalsBackup: {};
    name: string;
    testFile: import("./TestFile").TestFile;
    parent: TestInstance;
    callback: (ctx: TestCbPayload) => void;
    options: {
        reporter?: string | ProbsPlugin;
        runner?: "worker" | "fork";
        haltOnErrors?: boolean;
        glob?: string;
        ignore?: string & (string | string[]);
        concurrency?: number;
        updateSnapshots?: "all" | "none" | "new";
        globals?: boolean;
        path?: string | string[];
        timeout?: number;
        pattern?: string[];
        watch?: boolean;
        worker?: (({ file: string }: {
            file: any;
        }) => import("worker_threads").WorkerOptions) & (({ file: string }: {
            file: any;
        }) => WorkerOptions | import("child_process").ForkOptions);
        testConcurrencyMode?: "serial" | "parallel";
        /**
         * script that runs before each file. Runs in main thread
         */
        setupFile?: ProbsConfigFileHook;
        /**
         * script that runs after each file. Runs in main thread
         */
        teardownFile?: ProbsConfigFileHook;
        context?: (arg0: ProbsConfigContextCtx) => ProbsConfigContextCtx;
        onError?: (ctx: TestCbPayload) => void;
    };
    /** @type {TestCbPayload} */
    callbackContext: TestCbPayload;
    globals: {
        beforeAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        afterAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        beforeEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        afterEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        test: any;
        it: any;
        describe: any;
        expect: import("expect/build/types").Expect<import("expect/build/types").MatcherState>;
        assert: typeof assert;
    };
    runTestCallback(): Promise<void>;
    emitStarted(): void;
    emitFinished(): void;
    runChildren(): Promise<void>;
    run(): Promise<void>;
    registerTestCb(msg: any, ...params: any[]): Promise<void>;
    applyGlobals(): void;
    backupGlobals(): void;
    restoreGlobals(): void;
}
export type TestQueueItem = {
    msg: string;
    callback: (ctx: TestCbPayload) => void;
    /**
     * should skip the test
     */
    skip: boolean;
};
import assert from "assert";
