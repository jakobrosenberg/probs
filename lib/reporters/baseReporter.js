export const baseReporter = {
    addedFile: ({ file }) => { },
    openedFile: ({ file }) => { },
    closedFile: ({ file }) => { },
    queueingTest: ({ scope }) => { },
    startedTest: ({ scope }) => { },
    finishedAllTests: () => { },
    finishedTest: (({ scope, status, err }) => { })
}