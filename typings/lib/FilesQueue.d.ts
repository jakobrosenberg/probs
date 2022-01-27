export class FilesQueue {
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
