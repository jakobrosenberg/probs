export class FilesQueue {
    /**
     * @param {import('./probs').Probs} probs
     */
    constructor(probs: import('./probs').Probs);
    /** @type {FileItem[]} */
    pending: FileItem[];
    running: any[];
    finished: boolean;
    onComplete: (x: any) => any;
    onError: (x: any) => any;
    probs: import("./probs").Probs;
    /**
     * @param {FileItem} fileItem
     */
    add(fileItem: FileItem): Promise<void>;
    get isActive(): number;
    #private;
}
