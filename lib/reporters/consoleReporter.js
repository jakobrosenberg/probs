const log = console.log

console.time('time')

export const createReporter = (options = {}) => {
    const { verbose } = options
    const history = []
    const deepMap = {}

    const reporter = {
        addedFile: ({ scope }) => verbose && log('added file', scope),
        openedFile: ({ scope }) => verbose && log('opened file', scope),
        closedFile: ({ scope }) => verbose && log('closed file', scope),
        queueingTest: ({ scope }) => verbose && log('queueing test', scope.join(' / ')),
        startedTest: ({ scope }) => { verbose && log('started test', scope.join(' / ')) },
        finishedAllTests: () => {
            console.timeEnd('time')
            console.log(deepMap)
        },
        finishedTest: (({ scope, status, err }) => {
            scope = [...scope]
            const testName = scope.pop()
            const file = scope.shift()
            const text = [file, scope.join('/'), testName]
                .filter(Boolean)
                .join(' - ')
            if (status === 'succeed')
                console.log(text, '✅')
            else {
                console.log(text, '❌')
                console.error(err)
            }
        })
    }

    return new Proxy(reporter, {
        get: (target, event) => (payload) => {
            history.push({ payload, event })

            if (payload?.scope) {
                const { scope, ..._payload } = payload
                const [..._scope] = scope
                let
                    path,
                    obj = deepMap,
                    key = _scope.pop()

                while (path = _scope.shift()) {
                    obj[path] = obj[path] || {}
                    obj[path].children = obj[path].children || {}
                    obj = obj[path].children
                }
                obj[key] = { ...obj[key], ..._payload }
            }

            return target[event](payload)
        }
    })
}