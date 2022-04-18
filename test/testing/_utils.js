export const flatSummary = (state, depth = 0) => {
    let line = !state.name
        ? ''
        : state.ownStatus + ' ' + state.status + ''.padStart(depth * 2, ' ') + state.name

    if (state.hasChildren)
        Object.values(state.children).forEach(value => {
            const delim = line ? '\r\n' : ''
            line = line + delim + flatSummary(value, depth + 1)
        })
    return line
}
