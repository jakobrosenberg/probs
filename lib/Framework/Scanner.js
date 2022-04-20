import { readdir, stat } from 'fs/promises'
import { resolve } from 'path'
import picomatch from 'picomatch'

/**
 * @returns {Promise<any> & {resolve: Function, reject: Function}}
 */
const resolvablePromise = () => {
    let actions
    const promise = new Promise((resolve, reject) => (actions = { resolve, reject }))
    return Object.assign(promise, actions)
}

export class Dir {
    _files = []
    /** @type {File[]} */
    testFiles = []
    /** @type {Dir[]} */
    dirs = []
    options = {}

    isFinished = false

    /**
     * @param {import('./Probs').Probs} probs
     * @param {string} path
     * @param {Dir} parent
     */
    constructor(probs, path, parent) {
        this.probs = probs
        this.path = path
        this.parent = parent
        this.finished = resolvablePromise()
    }

    async refresh() {
        const setupDir = this.options.setupDir || (x => x)
        this._files = await readdir(this.path)
        await this.refreshOptions()
        await setupDir()
        await this.populateChildren()
    }

    checkIfFinished() {
        const filesFinished = this.testFiles.every(file => file.isFinished)
        const dirsFinished = this.dirs.every(dir => dir.isFinished)
        const allFinished = filesFinished && dirsFinished
        if (allFinished) {
            this.isFinished = true
            this.finished.resolve()
            this.parent?.checkIfFinished()
        }
    }

    async refreshOptions() {
        const { setupDir, teardownDir, ...parentOptions } =
            this.parent?.options || this.probs.options

        const file = this._files.find(name => name.match(/probs\.config\..?(j|t)s/))
        const options = file
            ? await import('file:///' + resolve(this.path, file)).then(r => r.default)
            : {}
        this.options = { ...parentOptions, ...options }
        this.isMatch = picomatch(this.options.glob)
        this.isIgnore = picomatch(this.options.ignore)
    }

    async populateChildren() {
        const paths = this._files.map(file =>
            [this.path, file].join('/').replace(/\\/g, '/'),
        )

        const promises = paths.map(async file => {
            if (!this.isIgnore(file)) {
                const stats = await stat(file)
                if (stats.isDirectory()) {
                    const dir = new Dir(this.probs, file, this)
                    this.dirs.push()
                    dir.refresh()
                } else if (this.isMatch(file.replace('../', ''))) {
                    const testFile = new File(file, this)
                    this.testFiles.push(testFile)
                    this.probs.onAddedFile.run({scope: [file], fileItem: {file, options: {}},state: 'started'})
                    testFile.runTests()
                }
            }
        })
        return Promise.all(promises)
    }
}

class File {
    isFinished = false

    /**
     * @param {string} path
     * @param {Dir} dir
     */
    constructor(path, dir) {
        this.path = path
        this.dir = dir

        this.dir.probs.onAddedFile.run({
            scope: [path],
            fileItem: { file: path, options: this.dir.options },
        })
    }

    async runTests() {
        const queueItem = await this.dir.probs.queueManager.push(() => {
            const runner = this.dir.probs.runner
            return runner(this.dir.probs, this.path, this.dir.options)
        }, this.path)
        await queueItem.resolved
        this.isFinished = true
        this.dir.checkIfFinished()
    }
}
