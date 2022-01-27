export function createTestStateManager(): {
    events: {
        addedTest: ({ scope }: {
            scope: any;
        }) => TestState;
        addedFile: ({ scope }: {
            scope: any;
        }) => TestState;
        finishedTest: (params: any) => any;
        startedTest: ({ scope }: {
            scope: any;
        }) => any;
        openedFile: ({ scope }: {
            scope: any;
        }) => any;
        closedFile: ({ scope }: {
            scope: any;
        }) => any;
        finishedAllTests: () => void;
    };
    rootTestState: TestState;
    getStateNodeByScope: (scope: any) => any;
    stateProxy: (target: Partial<ReporterCollection<{
        rootTestState: TestState;
        testState: TestState;
    }>>) => Partial<ReporterCollection<{
        rootTestState: TestState;
        testState: TestState;
    }>>;
};
export class TestState {
    /**
     * @param {{scope: Scope, parent: TestState, name: string}=} ctx
     */
    constructor(ctx?: {
        scope: Scope;
        parent: TestState;
        name: string;
    });
    /** @type {Status} */
    ownStatus: Status;
    /** @type {Error} */
    ownErr: Error;
    /** @type {Date} */
    startedAt: Date;
    /** @type {Date} */
    finishedAt: Date;
    /** @type {Object.<string, TestState>} */
    children: {
        [x: string]: TestState;
    };
    /** @type {State} */
    ownState: State;
    name: string;
    scope: Scope;
    get parent(): TestState;
    get level(): number;
    get isFile(): boolean;
    get hasChildren(): boolean;
    get duration(): number;
    /** @returns {State[]} */
    get nestedStates(): State[];
    /** @returns {Status[]} */
    get nestedStatuses(): Status[];
    /** @returns {Error[]} */
    get err(): Error[];
    /** @returns {Status} */
    get status(): Status;
    /** @returns {State} */
    get state(): State;
    started(): void;
    finished(ctx: any): void;
    toJSON(): TestState;
    #private;
}
export type ReporterCtx = {
    scope?: Scope | undefined;
    err?: Error | undefined;
    status?: Status | undefined;
};
export type EnhancedReporterCtx<T> = ReporterCtx & T;
export type StateProxyCtx = ReporterCtx & {
    rootTestState: TestState;
    testState: TestState;
};
export type Reporter = () => any;
export type ReporterCallback<C> = (ctx: C, ...params: any[]) => any;
export type ReporterCollection<T> = {
    addedFile: ReporterCallback<EnhancedReporterCtx<T>>;
    openedFile: ReporterCallback<EnhancedReporterCtx<T>>;
    closedFile: ReporterCallback<EnhancedReporterCtx<T>>;
    addedTest: ReporterCallback<EnhancedReporterCtx<T>>;
    startedTest: ReporterCallback<EnhancedReporterCtx<T>>;
    finishedAllTests: ReporterCallback<EnhancedReporterCtx<T>>;
    catch: ReporterCallback<EnhancedReporterCtx<T>>;
    finishedTest: ReporterCallback<{
        scope: Scope;
        status: Status;
        err: Error;
    } & T>;
};
