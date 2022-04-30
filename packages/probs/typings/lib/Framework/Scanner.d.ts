export class Dir {
    /**
     * @param {import('./Probs').Probs} probs
     * @param {string} path
     * @param {Dir} parent
     */
    constructor(probs: import('./Probs').Probs, path: string, parent: Dir);
    _files: any[];
    /** @type {File[]} */
    testFiles: File[];
    /** @type {Dir[]} */
    dirs: Dir[];
    options: {};
    probs: import("./Probs").Probs;
    path: string;
    parent: Dir;
    refresh(): Promise<void>;
    refreshOptions(): Promise<void>;
    isMatch: any;
    isIgnore: any;
    populateChildren(): Promise<void[]>;
}
declare class File {
    /**
     * @param {string} path
     * @param {Dir} dir
     */
    constructor(path: string, dir: Dir);
    path: string;
    dir: Dir;
    runTests(): Promise<void>;
}
export {};
