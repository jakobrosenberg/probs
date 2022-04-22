/// <reference types="node" />
/**
 * The instance of a single test
 */
export class TestInstance {
    /**
     * @param {string} name
     * @param {(ctx: TestCbPayload)=>void} callback
     * @param {import('./TestFile').TestFile} testFile
     * @param {TestInstance=} parent
     */
    constructor(name: string, callback: (ctx: TestCbPayload) => void, testFile: import('./TestFile').TestFile, parent?: TestInstance | undefined);
    /** @type { TestInstance[] } */
    children: TestInstance[];
    status: any;
    ownStatus: any;
    ownErr: any;
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
    callbackContext: {
        expect: import("expect/build/types").Expect<import("expect/build/types").MatcherState>;
        beforeAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        afterAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        beforeEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        afterEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        file: {
            relativePath: any;
            path: string;
            relativeDir: string;
            dir: string;
        };
        scope: any;
    };
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
    registerTestCb(msg: any, callback: any): Promise<void>;
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
