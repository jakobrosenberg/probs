export namespace bgColorMap {
    function pass(s: any): string;
    function fail(s: any): string;
    function unresolved(s: any): string;
    function skipped(s: any): string;
    function partial(s: any): string;
}
export namespace colorMap {
    export { green as pass };
    export { red as fail };
    export function unresolved_1(s: any): string;
    export { unresolved_1 as unresolved };
    export { whiteBright as skipped };
    export { yellowBright as partial };
    export { yellowBright as nestedDidntPass };
}
export namespace testStatusMap {
    const pass_1: string;
    export { pass_1 as pass };
    const fail_1: string;
    export { fail_1 as fail };
    export const nestedDidntPass: string;
    const unresolved_2: string;
    export { unresolved_2 as unresolved };
    const skipped_1: string;
    export { skipped_1 as skipped };
    const partial_1: string;
    export { partial_1 as partial };
}
/**
 * @callback Formatter
 * @param {import('../../helpers/state.js').TestState} testState
 * @param {...any} rest
 */
/**
 * @type {Object.<string, Formatter>}
 */
export const formatters: {
    [x: string]: Formatter;
};
export type Formatter = (testState: any, ...rest: any[]) => any;
import { green } from "colorette";
import { red } from "colorette";
import { whiteBright } from "colorette";
import { yellowBright } from "colorette";
