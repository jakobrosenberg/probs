import { dirname } from 'path'
import { pathToFileURL } from 'url'
import { importCfg } from '../../utils/misc.js'
import { TestInstance } from './TestInstance.js'

/**
 * Runs all tests in a single file
 */
export class TestFile {
    /**
     * @param {string} file
     * @param {ProbsEmitter} emitter
     * @param {Partial<ProbsOptions & ProbsConfig>} options
     */
    constructor(file, emitter, options) {
        this.file = file
        this.emitter = emitter
        this.options = options
    }

    async run() {
        this.emitter('openedFile', { scope: [this.file] })
        const localCfg = await importCfg(dirname(this.file)+'/probs.config.js')
        const options = {...this.options, ...localCfg}
        const testContext = new TestInstance(this.file, () => this.importTestFile(), this)        
        
        if (options.setupFile) await options.setupFile(this.file, { options })
        await testContext.run()
        if (options.teardownFile) await options.teardownFile(this.file, { options })
        
        this.emitter('closedFile', { scope: [this.file] })
    }

    async importTestFile() {
        try {
            await import(pathToFileURL(this.file).href)
        } catch (err) {
            console.error('Failed to run tests for', this.file)
            console.error(err)
        }
    }
}
