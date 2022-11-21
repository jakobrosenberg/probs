/**
 * @template T
 * @typedef {ReporterCtx & T} EnhancedReporterCtx
 */
/**
 * @typedef {ReporterCtx & {rootTestState: TestState, testState: TestState}} StateProxyCtx
 */
/**
 * @callback Reporter
 * @prop {Reporter} ctx
 */
/**
 * @template C
 * @callback ReporterCallback
 * @param {C} ctx
 * @param {...any} params
 */
/**
 * @template T
 * @typedef {Object} ReporterCollection
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} addedFile
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} openedFile
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} closedFile
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} addedTest
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} startedTest
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} finishedAllTests
 * @prop {ReporterCallback<EnhancedReporterCtx<T>>} catch
 * @prop {ReporterCallback<{scope: Scope, status: Status, err: Error} & T>} finishedTest
 */
export class StateManager {
    /**
     *
     * @param {import('./Probs.js').Probs} probs
     */
    constructor(probs: import('./Probs.js').Probs);
    log: any[];
    activeTasks: BusyMap;
    probs: import("./Probs.js").Probs;
    rootTestState: TestState;
    /**
     * @param {string[]} scope
     * @returns {TestState}
     */
    getByScope(scope: string[]): TestState;
    /**
     * @param {{scope: string[]}} param0
     * @returns {{state: TestState, scope: string[]}}
     */
    _addTestState({ scope }: {
        scope: string[];
    }): {
        state: TestState;
        scope: string[];
    };
}
/**
 * TestState represents Root, files and tests
 */
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
    /** @type {Error & {text: string, raw: any}} */
    ownErr: Error & {
        text: string;
        raw: any;
    };
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
    /**
     * @type {TestState[]}
     */
    get descendants(): TestState[];
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
    comments: any;
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
import { BusyMap } from "./TestRunner/utils/index.js";
