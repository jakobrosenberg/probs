/**
 * Runs all tests in a single file
 */
export class TestFile {
    /**
     * @param {string} file
     * @param {ProbsEmitter} emitter
     * @param {ProbsOptions} options
     */
    constructor(file: string, emitter: ProbsEmitter, options: ProbsOptions);
    file: string;
    emitter: ProbsEmitterCb;
    options: ProbsOptions;
    run(): Promise<void>;
    importTestFile(): Promise<void>;
}
