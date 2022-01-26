import { defaults } from './defaults.js'
import * as reporters from './reporters/index.js'
import { Scanner } from './Scanner.js'
import { resolveConfig } from './utils.js'

export const probs = async (path, options = {}) => {
    options = Object.assign({}, defaults, options)
    options.path = path
    options.scopedConfigs = []
    options = { ...(await resolveConfig(options)), ...options }
    options.reporter = reporters[options.reporter](options.reporterOptions)
    const paths = [path].flat(Infinity)

    const scanner = new Scanner(options)

    paths.forEach(path => scanner.scanDir(path, options))
}