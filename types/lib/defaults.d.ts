export namespace defaults {
    const reporter: Partial<import("./helpers/state.js").ReporterCollection<{
        rootTestState: import("./helpers/state.js").TestState;
        testState: import("./helpers/state.js").TestState;
    }>>;
    const runner: string;
    const haltOnErrors: boolean;
}
