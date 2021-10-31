export const baseReporter = {
    addedFile: ({ scope }) => { },
    openedFile: ({ scope }) => { },
    closedFile: ({ scope }) => { },
    startedTest: ({ scope }) => { },
    finishedTest: (({ scope, status, err }) => { }),
    finishedAllTests: () => { },
}