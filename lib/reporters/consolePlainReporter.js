const log = console.log

console.time('time')

export const createReporter = (verbose) => {
    const reporter = {
        addedFile: ({ scope }) => verbose && log('added file', scope),
        openedFile: ({ scope }) => verbose && log('opened file', scope),
        closedFile: ({ scope }) => verbose && log('closed file', scope),
        queueingTest: ({ scope }) => verbose && log('queueing test', scope.join(' / ')),
        startedTest: ({ scope }) => { verbose && log('started test', scope.join(' / ')) },
        finishedAllTests: () => { console.timeEnd('time') },
        finishedTest: (({ scope, status, err }) => {
            const testName = scope.pop()
            const file = scope.shift()
            const text = [file, scope.join('/'), testName]
                .filter(Boolean)
                .join(' - ')
            if (status === 'pass')
                console.log(text, '✅')
            else {
                console.log(text, '❌')
                console.error(err)
            }
        })
    }

    return reporter
}