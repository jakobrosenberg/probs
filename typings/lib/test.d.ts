export function createTest(parentScope: any[], { options, hooks, createQueuedFunction }: {
    options: any;
    hooks: any;
    createQueuedFunction: any;
}, parentPromiseQueue?: any[]): (msg: any, cb: any) => Promise<any>;
