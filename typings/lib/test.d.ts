export function createTest({ parentScope, options, hooks, createQueuedFunction, emitter, parentPromiseQueue, }: ProbsTestPayload): (msg: any, cb: any) => Promise<any>;
export type ProbsTestPayload = {
    parentScope: string[];
    emitter: ProbsEmitter;
    options: ProbsOptions;
    hooks: {
        beforeAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        afterAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        beforeEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
        afterEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    };
    createQueuedFunction: any;
    parentPromiseQueue: any;
};
