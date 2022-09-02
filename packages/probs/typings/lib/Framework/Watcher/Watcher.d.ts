/**
 * @param {Partial<ProbsOptions>=} options
 */
export class Watcher {
    constructor(options: any);
    /** @type {Probs} */
    probs: Probs;
    isWatching: boolean;
    options: any;
    menu: Menu;
    get isIdle(): boolean;
    run(): void;
    watch(): void;
}
import { Probs } from "../Probs.js";
import { Menu } from "./Menu.js";
