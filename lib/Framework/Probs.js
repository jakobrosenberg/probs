import { createPipelineCollection } from 'hookar'
import { defaults } from '../defaults.js'
import { StateManager } from './StateManager.js'
import reporters from '../reporters/index.js'
import { Dir } from './Scanner.js'
import { capitalize, resolveConfig } from '../utils/misc.js'
import runners from './TestRunner/runners/index.js'
import { QueueManager } from '../utils/QueueManager.js'

/**
 * @returns {import('hookar').CollectionSyncVoid<HookPayloadFields>}
 */
const createHook = () => createPipelineCollection()

/**
 *
 * @param {string|string[]} path
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

    /**
     *
     * @param {Partial<ProbsOptions>} options
     */
    constructor(options) {
        options = Object.assign({}, defaults, options)
        if (!options.path) throw new Error('path is missing')
        // todo create normalizer function options. Also needed for worker, fork etc.
        if (typeof options.reporter === 'string')
            options.reporter = reporters[options.reporter]
        options.timeout = Number(options.timeout)
        this.paths = /** @type {string[]} */ ([options.path].flat(Infinity))
        this.options = options
        this.runner = runners[options.runner]
        if (!this.runner) throw new Error(`Could not find runner: ${options.runner}`)
        this.stateManager = new StateManager(this)
        this.queueManager = new QueueManager(options.concurrency)

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
     * @returns {Promise<import('./StateManager').TestState>}
     */
    async run() {
        const promises = this.paths.map(async path => {
            const dir = new Dir(this, path, null)
            dir.refresh()
            await dir.finished
        })

        await Promise.all(promises)

        this.onFinishedAllTests.run(null)

        return this.stateManager.rootTestState
    }
}
