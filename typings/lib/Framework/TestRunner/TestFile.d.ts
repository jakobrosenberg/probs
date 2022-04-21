/**
 * Runs all tests in a single file
 */
export class TestFile {
    /**
     * @param {string} file
     * @param {ProbsEmitter} emitter
     * @param {Partial<ProbsOptions & ProbsConfig>} options
     */
    constructor(file: string, emitter: ProbsEmitter, options: Partial<ProbsOptions & ProbsConfig>);
    file: string;
    emitter: ProbsEmitterCb;
    options: Partial<ProbsOptions & Partial<ProbsConfigOptions>>;
    run(): Promise<void>;
    importTestFile(): Promise<void>;
}
