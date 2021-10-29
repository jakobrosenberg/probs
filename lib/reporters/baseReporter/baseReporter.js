export const baseReporter = {
    addedFile: ({ scope }) => { },
    openedFile: ({ scope }) => { },
    closedFile: ({ scope }) => { },
    queueingTest: ({ scope }) => { },
    startedTest: ({ scope }) => { },
    finishedAllTests: () => { },
    finishedTest: (({ scope, status, err }) => { })
}