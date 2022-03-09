import { defaults } from './defaults.js'
import { FilesQueue } from './FilesQueue.js'
import * as reporters from './reporters/index.js'
import { Scanner } from './Scanner.js'
import { resolveConfig } from './utils/misc.js'

export const probs = async (path, options = {}) => {
    options = Object.assign({}, defaults, options)
    options.path = path
    options.scopedConfigs = []
    options = { ...(await resolveConfig(options)), ...options }
    if (typeof options.reporter === 'string')
        options.reporter = reporters[options.reporter](options.reporterOptions)

    const instance = new Probs(options)
    return instance.run()
}

export class Probs {
    constructor(options) {
        this.paths = [options.path].flat(Infinity)
        this.options = options
        this.filesQueue = new FilesQueue(this)
        this.scanner = new Scanner(this)
    }

    run() {
        this.paths.forEach(path => this.scanner.scanDir(path, this.options))
        return new Promise((resolve, reject) => {
            this.onComplete = () => {
                resolve()
            }
            this.filesQueue.onError(reject)
        })
    }

    checkStatus() {
        if (!this.filesQueue.isActive && !this.scanner.isActive) {
            this.options.reporter.finishedAllTests({})

            this.onComplete()
        }
    }
}
