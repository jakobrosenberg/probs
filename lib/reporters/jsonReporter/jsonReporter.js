import { createTestStateManager } from "../../helpers/state.js"

const { stateProxy } = createTestStateManager()

export const JsonReporter = () => stateProxy({
    addedFile: ({ scope }) => { },
    openedFile: ({ scope }) => { },
    closedFile: ({ scope }) => { },
    startedTest: ({ scope }) => { },
    finishedTest: ((ctx) => { }),
    finishedAllTests: ({ rootTestState, testState }) => {
        console.log(JSON.stringify(rootTestState, null, 2))
    },
})