/**
 * @template {Error} T
 * @param {T} err
 * @returns {T & {raw: T, text: string}}
 */
export const portableError = err => {
    const raw = err
    const json = toJSON(err)
    return {
        ...json,
        raw,
        text:
            (err.toString && err.toString()) ||
            err.message ||
            err.name ||
            '[no error description]',
    }
}

/**
 * @param {any} obj
 * @param {string[]} keys
 */
export const cloneKeys = (obj, keys) =>
    keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})

// todo make "// matcher"
// fo//bar//ba should match ['foo','bar','baz']
// pattern should normalize to nested arrays

/**
 * if input is an array, the input is returned
 * if input is a string, the string is split by the delim and returned
 * @template I
 * @template {string|Array} T
 * @param {T} input
 * @param {string} delim
 * @return {T extends Array ? T : string[]}
 */
const splitIfString = (input, delim) =>
    // @ts-ignore
    typeof input === 'string' ? input.split(delim) : input

/**
 *
 * @example
 * ```javascript
 * const a = normalizePatterns('myfile//my test//my nested test;;myfile2//my 2nd test')
 * const b = normalizePatterns([
 *   'myfile//my test//my nested test',
 *   'myfile2//my 2nd test'
 * ])
 * // true
 * a == b == [
 *  ['myfile', 'my test', 'my nested test'],
 *  ['myfile2', 'my 2nd test', 'my nested test'],
 * ]
 * ```
 * @param {(((string|RegExp)[])|string)[]|string} input
 * @returns {string[][]}
 */
export const normalizePatterns = input => {
    const patternsSplitByFile = splitIfString(input, ';;')
    const patternsSplitByFileAndTest = patternsSplitByFile.map(_input =>
        splitIfString(_input, '//'),
    )
    return patternsSplitByFileAndTest
}

/**
 *
 * @param {string[]} scope
 * @param {(((string|RegExp)[])|string)[]|string} patterns
 * @returns
 */
export const scopeMatchesPattern = (scope, patterns) => {
    const _patterns = normalizePatterns(patterns)
    
    return !patterns.length || _patterns.find(pattern =>
        scope.every((name, index) => name.match(pattern[index])),
    )
}

/**
 * JSON.parse(JSON.stringify) with preservation of ownKeys in the root of the object
 * @param {Object} obj
 */
const toJSON = obj =>
    JSON.parse(
        JSON.stringify(
            Reflect.ownKeys(obj).reduce((acc, cur) => ({ ...acc, [cur]: obj[cur] }), {}),
            createCircularReplacer(),
        ),
    )

const createCircularReplacer = () => {
    const seen = new WeakSet()
    return (_key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) return null
            seen.add(value)
        }
        return value
    }
}

export class BusyMap extends Map {
    onEmpty() {}

    set(key) {
        return super.set(key)
    }

    delete(key) {
        const result = super.delete(key)
        if (!this.size) this.onEmpty()
        return result
    }
}
