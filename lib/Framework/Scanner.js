import { readdir, stat } from 'fs/promises'
import { resolve } from 'path'
import picomatch from 'picomatch'
import { importCfg } from '../utils/misc.js'

export class Dir {
    _files = []
    /** @type {File[]} */
    testFiles = []
    /** @type {Dir[]} */
    dirs = []
    options = {}

    /**
     * @param {import('./Probs').Probs} probs
     * @param {string} path
     * @param {Dir} parent
     */
    constructor(probs, path, parent) {
        parent?.dirs.push(this)
        this.probs = probs
        this.path = path
        this.parent = parent
    }

    async refresh() {
        const setupDir = this.options.setupDir || (x => x)
        this._files = await readdir(this.path)
        this.probs.stateManager.activeTasks.set(this)
        await this.refreshOptions()
        await setupDir()
        await this.populateChildren()
        this.probs.stateManager.activeTasks.delete(this)
    }

    async refreshOptions() {
        const { setupDir, teardownDir, ...parentOptions } =
            this.parent?.options || this.probs.options

        const file = this._files.find(name => name.match(/probs\.config\..?(j|t)s/))
        const options = file && importCfg(resolve(this.path, file))
        this.options = { ...parentOptions, ...options }
        this.isMatch = picomatch(this.options.glob)
        this.isIgnore = picomatch(this.options.ignore)
    }

    async populateChildren() {
        const paths = this._files.map(file =>
            [this.path, file].join('/').replace(/[\\/]+/g, '/'),
        )

        let hasChildren = false

        const promises = paths.map(async file => {
            if (!this.isIgnore(file)) {
                const stats = await stat(file)
                if (stats.isDirectory()) {
                    hasChildren = true
                    const dir = new Dir(this.probs, file, this)
                    this.dirs.push()
                    return dir.refresh()
                } else if (this.isMatch(file.replace(/^\.+\//, ''))) {
                    hasChildren = true
                    const testFile = new File(file, this)
                    this.testFiles.push(testFile)
                    this.probs.onAddedFile.run({
                        scope: [file],
                        fileItem: { file, options: {} },
                    })
                    testFile.runTests()
                }
            }
        })
        return await Promise.all(promises)
    }
}

class File {
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
        this.dir.probs.stateManager.activeTasks.set(this)
        const queueItem = await this.dir.probs.queueManager.push(() => {
            const runner = this.dir.probs.runner
            return runner(this.dir.probs, this.path, this.dir.options)
        }, this.path)
        await queueItem.resolved
        this.dir.probs.stateManager.activeTasks.delete(this)
    }
}
