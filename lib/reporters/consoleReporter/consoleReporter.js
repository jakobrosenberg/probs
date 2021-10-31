import { fileText, testText } from './utils.js'
const log = console.log
console.time('total')

const printResults = (name, map, level = 0) => {
    const isLeaf = !map.children
    const indentation = level * 2
    const isFile = !level

    if (isFile)
        console.log(fileText(name, map))
    else {
        console.log((''.padStart(indentation, ' ') + testText(name, map)))
        if (map.err) console.error(map.err)
    }

    if (!isLeaf)
        Object.entries(map.children)
            .filter(([, value]) => value.status !== 'skipped').
            forEach(([key, value]) => {
                printResults(key, value, level + 1)
            })
}

export const ConsoleReporter = (options = {}) => {
    const { verbose } = options
    const history = []
    const deepMap = {}

    const reporter = {
        addedFile: ({ scope }) => verbose && log('added file', scope),
        openedFile: ({ scope }) => verbose && log('opened file', scope),
        closedFile: ({ scope }) => {
            printResults(scope[0], deepMap[scope[0]])
        },
        startedTest: ({ scope }) => { verbose && log('started test', scope.join(' / ')) },
        finishedAllTests: () => { console.timeEnd('total') },
        finishedTest: (({ scope, status, err }) => { })
    }

    return new Proxy(reporter, {
        get: (target, event) => (payload) => {
            history.push({ payload, event })
            if (payload?.scope) {
                const { scope, ..._payload } = payload

                const [..._scope] = scope
                let path, obj = deepMap

                while (path = _scope.shift()) {
                    const isAncestor = _scope.length
                    obj[path] = obj[path] || {}


                    if (isAncestor) {
                        obj[path].children = obj[path].children || {}
                        obj = obj[path].children
                    }
                    else
                        Object.assign(obj[path], _payload)

                }
            }

            const fn = target[event] || target.catch || (x => x)
            return fn(payload)
        }
    })
}