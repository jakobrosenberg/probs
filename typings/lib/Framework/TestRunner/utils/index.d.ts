export function portableError<T extends Error>(err: T): T & {
    raw: T;
    text: string;
    json: T;
};
export function cloneKeys(obj: any, keys: string[]): {};
export function scopeMatchesPattern(scope: string[], patterns: (string | RegExp)[]): string | true | RegExp;
