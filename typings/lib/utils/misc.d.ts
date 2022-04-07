export function createDirname(meta: any): string;
export function resolveConfig(options: any): Promise<any>;
export function createHooksCollection(): {
    beforeAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    afterAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    beforeEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    afterEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
};
export function createQueuedFunctionWrapper(queueTime: 'atCreate' | 'atCall'): {
    <T extends Function>(cb: T): T;
    queue: {
        cb: Function;
        resolve: Function;
        reject: Function;
    }[];
};
export function capitalize(str: any): any;
export function addTimeoutToPromise<T, P extends T | Promise<T>>(promise: P, time: number | string, error?: (string | Error) | undefined): P;
export function fileFromScope(scope: any): {
    relativePath: any;
    path: string;
    relativeDir: string;
    dir: string;
};
