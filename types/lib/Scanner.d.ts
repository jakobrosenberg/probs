export class Scanner {
    constructor(options: any);
    filesQueue: FilesQueue;
    isMatch: any;
    isIgnore: any;
    /**
     * scan dir recursively
     * @param {string} path
     * @param {*} options
     * @param {DirPromise[]} dirPromises
     */
    scanDir(path: string, { ...options }: any, dirPromises?: DirPromise[]): void;
}
import { FilesQueue } from "./FilesQueue.js";
