import { fork } from './runners/fork/index.js'
import { worker } from './runners/worker/index.js'

const runners = { worker, fork }

export class FilesQueue {
    /** @type {FileItem[]} */
    pending = []
    running = []
    finished = false
    #waitingForDirSetup = 0

    async #processFile(file, options) {
        const runner = runners[options.runner]
        if (!runner) throw new Error(`Could not find runner: ${options.runner}`)
        return runner(file, options)
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

        if (this.finished)
            throw new Error("can't add test file after tests have finished: " + file)

        options.reporter.addedFile({ scope: [file], fileItem })

        this.pending.push(fileItem)

        if (this.running.length < options.concurrency) await this.#processQueue()
        if (
            !this.running.length &&
            !this.pending.length &&
            !this.#waitingForDirSetup &&
            !this.finished
        ) {
            this.finished = true
            options.reporter.finishedAllTests({})
        }
    }
}
