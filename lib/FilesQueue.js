import { runFileWithWorker, testFile } from './testFile.js'

export class FilesQueue {
    /** @type {FileItem[]} */
    pending = []
    running = []
    finished = false
    #waitingForDirSetup = 0

    #processQueueWithWorker = async () => {
        while (this.pending.length) {
            const fileItem = this.pending.shift()
            const { file, options } = fileItem
            const worker = runFileWithWorker(file, options)
            this.running.push(worker)
            await worker
            await this.#teardownDirs(fileItem)
            this.running.splice(this.running.indexOf(worker), 1)
        }
    }

    /**
     * @param {FileItem} fileItem
     */
    async #processQeueWithoutWorker({ file, options }) {
        testFile(file, options)
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
        if (!options.workers) this.#processQeueWithoutWorker(fileItem)
        if (this.running.length < options.workers)
            await this.#processQueueWithWorker()
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
