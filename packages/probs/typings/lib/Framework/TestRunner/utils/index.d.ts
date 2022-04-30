export function portableError<T extends Error>(err: T): T & {
    raw: T;
    text: string;
};
export function cloneKeys(obj: any, keys: string[]): {};
export function normalizePatterns(input: (((string | RegExp)[]) | string)[] | string): string[][];
export function scopeMatchesPattern(scope: string[], patterns: (((string | RegExp)[]) | string)[] | string): true | string[];
export class BusyMap extends Map<any, any> {
    constructor();
    constructor(entries?: readonly (readonly [any, any])[]);
    constructor();
    constructor(iterable?: Iterable<readonly [any, any]>);
    onEmpty(): void;
    set(key: any): BusyMap;
    delete(key: any): boolean;
}
