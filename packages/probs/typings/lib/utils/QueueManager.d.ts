export class QueueManager {
    constructor(concurrency?: number);
    /** @type {QueueItem[]} */
    queue: QueueItem[];
    /** @type {QueueItem[]} */
    activeCallbacks: QueueItem[];
    concurrency: number;
    push(callback: any, tag: any): QueueItem;
    checkQueue(): Promise<void>;
}
declare class QueueItem {
    constructor(callback: any, tag: any);
    tag: any;
    callback: any;
    resolved: Promise<any>;
    run: () => Promise<void>;
}
export {};
