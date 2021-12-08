/**
 * @callback Test
 * @param {string} description
 * @param {(test: Test)=>void} callback
 */
/**
 * @global
 * @type {Test}
 */
declare let test: Test;
/**
 * @global
 * @type {import('assert')}
 */
declare let assert: any;
type Test = (description: string, callback: (test: Test) => void) => any;
type Status = "fail" | "pass" | "skipped";
type State = "pending" | "started" | "finished";
type Scope = string[];
type ProbsConfigContextCtx = {
    scope: string[];
};
type ProbsConfigOptions = {
    worker: (arg0: {
        file: string;
    }) => any;
    setupFile: (arg0: string) => any;
    context: (arg0: ProbsConfigContextCtx) => ProbsConfigContextCtx;
};
type ProbsConfig = Partial<ProbsConfigOptions>;
