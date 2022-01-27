export function createDirname(meta: any): string;
export function resolveConfig(options: any): Promise<any>;
export function createHooksCollection(): {
    beforeAll: (cb: any) => any;
    afterAll: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    beforeEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
    afterEach: import("hookar").CollectionSyncVoid<any> | import("hookar").CollectionAsyncVoid<any>;
};
