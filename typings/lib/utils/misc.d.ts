export function createDirname(meta: any): string;
export function resolveConfig(options: any): Promise<any>;
export function createHooksCollection(): {
    beforeAll: (cb: any) => any;
    afterAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    beforeEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    afterEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
};
export function createQueuedFunctionWrapper(mode?: 'serial' | 'parallel'): {
    <T>(cb: T): T;
    queue: {
        cb: Function;
        resolve: Function;
        reject: Function;
        params: any;
    }[];
};
