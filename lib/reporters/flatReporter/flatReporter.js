const log = console.log

console.time('FlatReporter: total time')

export const FlatReporter = (verbose) => {
    const reporter = {
        addedFile: ({ scope }) => verbose && log('added file', scope),
        openedFile: ({ scope }) => verbose && log('opened file', scope),
        closedFile: ({ scope }) => verbose && log('closed file', scope),
        queueingTest: ({ scope }) => verbose && log('queueing test', scope.join(' / ')),
        startedTest: ({ scope }) => { verbose && log('started test', scope.join(' / ')) },
        finishedAllTests: () => { console.timeEnd('FlatReporter: total time') },
        finishedTest: (({ scope, status, err, prevailingStatus, ...rest }) => {
            const testName = scope.pop()
            const file = scope.shift()
            const text = [file, scope.join('/'), testName]
                .filter(Boolean)
                .join(' - ')
            status = prevailingStatus || status
            if (status === 'pass')
                console.log(text, '✅')
            else {
                console.log(text, '❌')
                if (err)
                    console.error(err)
            }
        })
    }

    return reporter
}