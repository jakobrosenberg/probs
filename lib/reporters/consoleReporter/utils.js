import { bold, bgGreen, bgYellow, bgRed, bgWhite, black, whiteBright, green, red, yellowBright } from 'colorette'

/** @type {Status[]} */
const statusMap = ['fail', 'pass', 'skipped']

/**
 * 
 * @param {...Status} statuses 
 * @returns {Status}
 */
export const getPrevailingStatus = (...statuses) =>
    statuses
        .sort((a, b) => statusMap.indexOf(a) - statusMap.indexOf(b))
        .shift()


export const bgColorMap = {
    pass: s => bold(bgGreen(black(s))),
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

export const getFileStatusText = (ownStatus, status) => {
    const isPartial = ownStatus && ownStatus !== status
    const color = isPartial ? bgColorMap.partial : bgColorMap[status] || (x => x)
    return color(' ' + status + ' ')
}

export const getStatuses = map => {
    const { status } = map
    const childStatuses = Object.values(map.children || []).map(getStatuses)
    return [status, ...childStatuses].flat()
}

export const fileText = (name, map) => {
    const status = getPrevailingStatus(...getStatuses(map))
    const statusText = getFileStatusText(map.status, status)
    return `\n${statusText} ${name}`
}

export const testText = (name, map) => {
    const status = getPrevailingStatus(...getStatuses(map))
    const statusText = testStatusMap[status]
    const text = colorMap[status](name)
    return `${statusText} ${text}`
}
