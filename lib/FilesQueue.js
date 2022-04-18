import { fork } from './TestRunner/runners/fork/index.js'
import { worker } from './TestRunner/runners/worker/index.js'
import { main } from './TestRunner/runners/main/index.js'

const runners = { worker, fork, main }

export class FilesQueue {
    /** @type {FileItem[]} */
    pending = []
    running = []
    finished = false
    #waitingForDirSetup = 0
    onComplete = x => x
    onError = x => x

    /**
     * @param {import('./probs').Probs} probs
     */
    constructor(probs) {
        this.probs = probs
    }

    async #processFile(file, options) {
        const runner = runners[options.runner]
        if (!runner) throw new Error(`Could not find runner: ${options.runner}`)
        return runner(this.probs, file, options)
    }

    async #processQueue() {
        while (this.pending.length) {
            const fileItem = this.pending.shift()
            const { file, options } = fileItem
            const runnerPromise = this.#processFile(file, options)
            this.running.push(runnerPromise)
            await runnerPromise
            await this.#teardownDirs(fileItem)
            this.running.splice(this.running.indexOf(runnerPromise), 1)
        }
    }

    /**
     * @param {FileItem} fileItem
     */
    async #teardownDirs(fileItem) {
        fileItem.dirPromises.forEach(dp => {
            dp.subscribers = dp.subscribers.filter(sub => sub !== fileItem)
            if (!dp.subscribers.length) dp.teardownDir && dp.teardownDir()
        })
    }

    /**
     * @param {FileItem} fileItem
     */
    async #waitForDirSetups(fileItem) {
        this.#waitingForDirSetup++
        await Promise.all(fileItem.dirPromises.map(dp => dp.promise))
        this.#waitingForDirSetup--
    }

    /**
     * @param {FileItem} fileItem
     */
    async add(fileItem) {
        const { file, options } = fileItem

        await this.#waitForDirSetups(fileItem)

        this.probs.onAddedFile.run({ scope: [file], fileItem })

        this.pending.push(fileItem)
        if (this.running.length < options.concurrency) await this.#processQueue()
        this.probs.checkStatus()
    }

    get isActive() {
        return this.running.length || this.pending.length || this.#waitingForDirSetup
    }
}
