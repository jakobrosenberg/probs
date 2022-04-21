/**
 * probs.config.js
 */
type ProbsConfigOptions = {
    testConcurrencyMode: 'serial' | 'parallel';
    worker: ({ file: string }: {
        file: any;
    }) => WorkerOptions | import("child_process").ForkOptions;
    /**
     * script that runs before each file. Runs in main thread
     */
    setupFile: ProbsConfigFileHook;
    /**
     * script that runs after each file. Runs in main thread
     */
    teardownFile: ProbsConfigFileHook;
    context: (arg0: ProbsConfigContextCtx) => ProbsConfigContextCtx;
    glob: string;
    haltOnErrors: boolean;
    runner: 'worker' | 'fork';
    ignore: string[] | string;
    concurrency: number;
};
type ProbsConfigFileHook = (file: string, ctx: ProbsConfigFileHookContext) => any;
type ProbsConfigFileHookContext = {
    options: Partial<ProbsOptions & ProbsConfigOptions>;
};
