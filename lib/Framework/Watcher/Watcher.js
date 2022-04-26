import { Menu } from './Menu.js'
import { Probs } from '../Probs.js'
import CheapWatch from 'cheap-watch'
import picomatch from 'picomatch'

/**
 * @param {Partial<ProbsOptions>=} options
 */
export class Watcher {
    /** @type {Probs} */
    probs

    isWatching = false

    constructor(options) {
        this.options = options
        this.menu = new Menu(this)
    }

    get isIdle() {
        const isIdle = () => this.probs.stateManager.rootTestState.finishedAt
        return (!this.probs || isIdle()) && !this.menu.isOpen
    }

    run() {
        if (!this.isIdle) return
        this.probs = new Probs(this.options)
        this.probs.onFinishedAllTests(() => this.menu.home())
        this.probs.run()
        if (!this.isWatching) {
            this.isWatching = true
            this.watch()
        }
    }

    watch() {
        const ignores = [this.options.ignore, '**/__snapshots__/**'].flat()
        const isIgnore = picomatch(ignores)
        const restart = ({ path, stats }) =>
            this.isIdle && stats.isFile() && !isIgnore(path) && this.run()

        const paths = [this.options.path].flat()
        paths.map(dir => {
            const watch = new CheapWatch({ dir })
            watch.on('+', restart)
            watch.on('-', restart)
            watch.init()
        })
    }
}
