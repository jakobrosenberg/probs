const log = console.log

console.time('reporter')

export const reporter = (verbose) => ({
    addedFile: ({ file }) => verbose && log('added file', file),
    openedFile: ({ file }) => verbose && log('opened file', file),
    closedFile: ({ file }) => verbose && log('closed file', file),
    queueingTest: ({ scope }) => verbose && log('queueing test', scope.join(' / ')),
    startedTest: ({ scope }) => { log('started test', scope.join(' / ')) },
    finishedAllTests: () => { console.timeEnd('reporter') },
    finishedTest: (({ scope, status, err }) => {
        if (status = 'succeed')
            console.log(scope.join('-'), '✅')
        else {
            console.log(scope.join('-'), '❌')
            console.error(err)
        }
    })
})

