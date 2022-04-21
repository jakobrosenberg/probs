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

    set(key){
        return super.set(key)
    }

    delete(key) {
        const result = super.delete(key)
        if (!this.size) this.onEmpty()
        return result
    }
}