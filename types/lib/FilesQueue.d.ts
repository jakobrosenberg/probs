export class FilesQueue {
    constructor(options: any);
    options: any;
    /** @type {FileItem[]} */
    pending: FileItem[];
    running: any[];
    finished: boolean;
    /**
     * @param {FileItem} fileItem
     */
    add(fileItem: FileItem): Promise<void>;
    #private;
}
