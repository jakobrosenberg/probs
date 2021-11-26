export namespace bgColorMap {
    function pass(s: any): any;
    function fail(s: any): any;
    function skipped(s: any): any;
    function partial(s: any): any;
}
export namespace colorMap {
    export { green as pass };
    export { red as fail };
    export { whiteBright as skipped };
    export { yellowBright as partial };
}
export namespace testStatusMap {
    const pass_1: string;
    export { pass_1 as pass };
    const fail_1: string;
    export { fail_1 as fail };
    const skipped_1: any;
    export { skipped_1 as skipped };
    const partial_1: any;
    export { partial_1 as partial };
}
/**
 * @callback Formatter
 * @param {import('../..state').TestState} testState
 * @param {...any} rest
 */
/**
 * @type {Object.<string, Formatter>}
 */
export const formatters: {
    [x: string]: Formatter;
};
export type Formatter = (testState: any, ...rest: any[]) => any;
