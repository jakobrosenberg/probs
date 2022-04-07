export function probs(path: string | string[], options?: Partial<ProbsOptions> | undefined): Promise<import("./helpers/state.js").TestState>;
export class Probs {
    constructor(options: any);
    onAddedFile: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onAddedTest: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onFinishedTest: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onStartedTest: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onOpenedFile: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onClosedFile: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onFinishedAllTests: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    paths: any[];
    options: any;
    stateManager: StateManager;
    filesQueue: FilesQueue;
    scanner: Scanner;
    /**
     * @param {ProbEvents} eventName
     */
    callEvent(eventName: ProbEvents, params: any): any;
    /**
     *
     * @returns {Promise<import('./helpers/state.js').TestState>}
     */
    run(): Promise<import('./helpers/state.js').TestState>;
    onComplete: () => void;
    checkStatus(): Promise<void>;
}
import { StateManager } from "./helpers/state.js";
import { FilesQueue } from "./FilesQueue.js";
import { Scanner } from "./Scanner.js";
