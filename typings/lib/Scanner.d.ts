export class Scanner {
    /**
     * @param {import('./probs').Probs} probs
     */
    constructor(probs: import('./probs').Probs);
    probs: import("./probs").Probs;
    isMatch: any;
    isIgnore: any;
    isActive: boolean;
    /**
     * scan dir recursively
     * @param {string} path
     * @param {*} options
     * @param {DirPromise[]} dirPromises
     */
    scanDir(path: string, { ...options }: any, dirPromises?: DirPromise[]): Promise<void>;
}
