export function probs(path: string | string[], options?: Partial<ProbsOptions> | undefined): Promise<import("./StateManager.js").TestState>;
export class Probs {
    /**
     *
     * @param {ProbsOptions} options
     */
    constructor(options: ProbsOptions);
    onAddedFile: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onAddedTest: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onFinishedTest: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onStartedTest: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onOpenedFile: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onClosedFile: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    onFinishedAllTests: import("hookar").CollectionSyncVoid<HookPayloadFields>;
    paths: string[];
    options: ProbsOptions;
    runner: ProbsRunner;
    stateManager: StateManager;
    queueManager: QueueManager;
    /**
     * @param {ProbEvents} eventName
     */
    callEvent(eventName: ProbEvents, params: any): any;
    /**
     *
     * @returns {Promise<import('./StateManager').TestState>}
     */
    run(): Promise<import('./StateManager').TestState>;
}
import { StateManager } from "./StateManager.js";
import { QueueManager } from "../utils/QueueManager.js";
