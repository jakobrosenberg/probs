import { defaults } from './defaults.js'
import { FilesQueue } from './FilesQueue.js'
import { StateManager } from './helpers/state.js'
import * as reporters from './reporters/index.js'
import { Scanner } from './Scanner.js'
import { capitalize, resolveConfig } from './utils/misc.js'
import { createPipelineCollection } from 'hookar'

/**
 * @returns {import('hookar').CollectionSyncVoid<HookPayloadFields>}
 */
const createHook = () => createPipelineCollection()

/**
 *
 * @param {string} path
 * @param {Partial<ProbsOptions>=} options
 * @returns
 */
export const probs = async (path, options) => {    
    options.path = path
    options = { ...(await resolveConfig(options)), ...options }

    const instance = new Probs(options)
    return instance.run()
}

export class Probs {
    onAddedFile = createHook()
    onAddedTest = createHook()
    onFinishedTest = createHook()
    onStartedTest = createHook()
    onOpenedFile = createHook()
    onClosedFile = createHook()
    onFinishedAllTests = createHook()

    constructor(options) {
        options = Object.assign({}, defaults, options)
        if (!options.path) throw new Error('path is missing')
        if (typeof options.reporter === 'string')
            options.reporter = reporters[options.reporter]

        this.paths = [options.path].flat(Infinity)
        this.options = options
        this.stateManager = new StateManager(this)
        this.filesQueue = new FilesQueue(this)
        this.scanner = new Scanner(this)
        if (options.reporter) options.reporter(this)
    }

    /**
     * @param {ProbEvents} eventName
     */
    callEvent(eventName, params) {
        const _eventName = `on${capitalize(eventName)}`
        return this[_eventName].run(params)
    }

    /**
     *
     * @returns {Promise<import('./helpers/state.js').TestState>}
     */
    run() {
        this.paths.forEach(path => this.scanner.scanDir(path, this.options))
        return new Promise((resolve, reject) => {
            this.onComplete = () => resolve(this.stateManager.rootTestState)
            this.filesQueue.onError(reject)
        })
    }

    async checkStatus() {
        if (!this.filesQueue.isActive && !this.scanner.isActive) {
            await this.callEvent('finishedAllTests')
            this.onComplete()
        }
    }
}
