/**
 * @template {Error} T
 * @param {T} err
 * @returns {T & {raw: T, text: string, json: T}}
 */
export const portableError = err => ({
    ...err,
    raw: err,
    text:
        (err.toString && err.toString()) ||
        err.message ||
        err.name ||
        '[no error description]',
    json: JSON.parse(JSON.stringify(err)),
})

/**
 * @param {any} obj
 * @param {string[]} keys
 */
export const cloneKeys = (obj, keys) =>
    keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})

/**
 *
 * @param {string[]} scope
 * @param {(string|RegExp)[]} patterns
 * @returns
 */
export const scopeMatchesPattern = (scope, patterns) => {
    if (!patterns.length) return true
    const scopeStr = scope.join(' > ')
    return patterns.find(pattern => scopeStr.match(pattern))
}
