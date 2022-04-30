export function probs(path: string | string[], options?: Partial<ProbsOptions> | undefined): Promise<import("./StateManager.js").TestState>;
export class Probs {
    /**
     * @param {Partial<ProbsOptions>} options
     */
    constructor(options: Partial<ProbsOptions>);
    onAddedFile: import("hookar").HooksCollection<any>;
    onAddedTest: import("hookar").HooksCollection<any>;
    onFinishedTest: import("hookar").HooksCollection<any>;
    onStartedTest: import("hookar").HooksCollection<any>;
    onOpenedFile: import("hookar").HooksCollection<any>;
    onClosedFile: import("hookar").HooksCollection<any>;
    onFinishedAllTests: import("hookar").HooksCollection<any>;
    paths: string[];
    options: Partial<ProbsOptions>;
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
