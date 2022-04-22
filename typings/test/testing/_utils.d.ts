export function flatSummary(state: any, depth?: number): string;
export function createTestSuite(sequence?: boolean | undefined, runners?: RunnerEnum[] | undefined): TestSuiteCb;
export type RunnerEnum = 'fork' | 'worker' | 'main';
export type TestSuiteCb = (name: string, options: Partial<ProbsOptions>, suiteCb: (result: TestState, runner: RunnerEnum) => void) => any;
