import { bold } from "colorette"

const log = console.log

export const DebugReporter = (verbose = true) => new Proxy({}, {
    get: (_, event) => ({ scope, time, ...rest }) => {
        if (event !== 'finishedAllTests')
            console.log(time, bold(event), scope.join(' / '))
        if (Object.values(rest).length)
            console.log('      ', rest)
    }
})