class QueueItem {
    constructor(callback, tag) {
        this.tag = tag
        this.callback = callback
        this.resolved = new Promise((resolve, reject) => {
            this.run = async () => {
                try {
                    const result = await this.callback()

                    resolve(result)
                } catch (err) {
                    reject(err)
                }
            }
        })
    }
}

export class QueueManager {
    /** @type {QueueItem[]} */
    queue = []

    /** @type {QueueItem[]} */
    activeCallbacks = []

    constructor(concurrency = 4) {
        this.concurrency = concurrency
    }

    push(callback, tag) {
        const queueItem = new QueueItem(callback, tag)
        this.queue.push(queueItem)
        this.checkQueue()
        return queueItem
    }

    async checkQueue() {
        if (this.queue.length && this.activeCallbacks.length < this.concurrency) {
            const queueItem = this.queue.shift()
            this.activeCallbacks.push(queueItem)
            await queueItem.run()

            await queueItem.resolved

            this.activeCallbacks = this.activeCallbacks.filter(ac => ac != queueItem)
            this.checkQueue()
        }
    }
}
