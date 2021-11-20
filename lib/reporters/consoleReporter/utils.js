import { bold, bgGreen, bgYellow, bgRed, bgWhite, black, whiteBright, green, red, yellowBright, blackBright, dim, white } from 'colorette'


export const bgColorMap = {
    pass: s => bold(dim(bgGreen(whiteBright((s))))),
    fail: s => bold(bgRed(whiteBright(s))),
    skipped: s => bold(bgWhite(black(s))),
    partial: s => bold(bgYellow(black(s))),
}
export const colorMap = {
    pass: green,
    fail: red,
    skipped: whiteBright,
    partial: yellowBright
}

export const testStatusMap = {
    pass: '✅',
    fail: '❌',
    skipped: bold(bgWhite(black('skipped'))),
    partial: bold(bgYellow(black('partial'))),
}


/**
 * @callback Formatter
 * @param {import('../..state').TestState} testState
 * @param {...any} rest
 */

/**
 * @type {Object.<string, Formatter>}
 */
export const formatters = {
    duration: (testState) =>
        blackBright(testState.duration.toString().padStart(4) + ' ms'),
    testText: (testState) => {
        const { status } = testState
        const statusText = testStatusMap[status]
        const text = colorMap[status](testState.name)
        const duration = formatters.duration(testState)
        return `${statusText} ${text} ${duration}`
    },
    fileStatusText: (testState) => {
        const { status, ownStatus } = testState
        const isPartial = ownStatus && ownStatus !== status
        const color = isPartial ? bgColorMap.partial : bgColorMap[status] || (x => x)
        return color(' ' + (status || 'no tests').toUpperCase() + ' ')
    },
    fileText: (testState) => {
        const statusText = formatters.fileStatusText(testState)
        const duration = formatters.duration(testState)
        return `\n${statusText} ${testState.name} ${duration}`
    }
}