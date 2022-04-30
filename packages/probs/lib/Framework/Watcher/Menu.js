import readline from 'readline'
import prompts from 'prompts'

const keypress = () => {
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            escapeCodeTimeout: 50,
        })
        readline.emitKeypressEvents(process.stdin, rl)
        if (process.stdin.isTTY) process.stdin.setRawMode(true)
        process.stdin.resume()
        const listener = key => {
            process.stdin.removeListener('keypress', listener)
            if (process.stdin.isTTY) process.stdin.setRawMode(false)
            rl.close()
            resolve(key)
        }
        process.stdin.on('keypress', listener)
    })
}

export class Menu {
    waitingForKeyPress = false
    isOpen = false
    /**
     * @param {import('./Watcher').Watcher} watcher
     */
    constructor(watcher) {
        this.watcher = watcher
        watcher.options.pattern = watcher.options.pattern || []
    }

    prompts = {
        menu: async () => {
            this.isOpen = true
            const { option } = await prompts({
                type: 'select',
                message: 'Please select an option',
                name: 'option',
                choices: [
                    { title: 'Restart', value: 'restart' },
                    { title: 'Filter', value: 'testFilterMenu' },
                    { title: 'Back', value: 'home' },
                ],
            })
            if (option === 'restart') {
                this.isOpen = false
                this.watcher.run()
            } else if (option === 'home') {
                this.isOpen = false
                this.home()
            } else if (option) this.prompts[option]()
        },
        testFilterMenu: async () => {
            this.isOpen = true
            const { option } = await prompts({
                message: 'please select an option',
                type: 'select',
                name: 'option',
                choices: [
                    ...this.getActiveFilters(),
                    { title: '[Add custom filter]', value: 'addFilter' },
                    { title: '[Select tests]', value: 'selectTests' },
                    { title: '[Go back]', value: 'menu' },
                ],
            })
            if (option === 'addFilter') return this.addFilter()
            else if (option === 'selectTests') return this.prompts.selectTests()
            else if (option === 'menu') return this.prompts.menu()
            else return this.prompts.filter(option)
        },
        filter: async index => {
            this.isOpen = true
            const { option } = await prompts({
                message: 'please select an option',
                type: 'select',
                name: 'option',
                choices: [
                    { title: '[Delete]', value: 'delete' },
                    { title: '[Edit]', value: 'edit' },
                ],
            })
            if (option === 'edit') return this.prompts.editFilter()
            else {
                this.watcher.options.pattern.splice(index, 1)
                return this.prompts.menu()
            }
        },
        editFilter: async index => {
            this.isOpen = true
            const { filter } = await prompts({
                type: 'text',
                name: 'filter',
                message: 'Filter pattern',
                initial: this.watcher.options.pattern[index],
            })
            if (filter) this.watcher.options.pattern[index] = filter
            else this.watcher.options.pattern.splice(index, 1)
            return this.prompts.menu()
        },
        selectTests: async () => {
            // const sortByKey = key => (item1, item2) => item1[key] > item2[key] ? 1 : -1

            this.isOpen = true
            const tests = this.watcher.probs.stateManager.rootTestState.descendants.map(d => ({
                title: d.scope.join(' // '),
                value: d.scope.join(' // '),
            }))
            // .sort(sortByKey('title'))

            const { options } = await prompts({
                message: 'please select an option',
                type: 'multiselect',
                name: 'options',
                choices: tests,
            })
            this.watcher.options.pattern = [
                ...this.watcher.options.pattern,
                ...options,
            ].filter((value, index, arr) => arr.indexOf(value) === index)
            this.prompts.menu()
        },
    }

    async home() {
        console.log('[q] quit / [r] restart / [m] menu / [f] filter')
        if (!this.waitingForKeyPress)
            while (true) {
                this.waitingForKeyPress = true
                const key = await keypress()
                const map = {
                    q: () => process.exit(),
                    '\x03': () => process.exit(),
                    r: () => this.watcher.run(),
                    m: () => this.prompts.menu(),
                    f: () => this.prompts.testFilterMenu(),
                }
                if (map[key]) {
                    this.waitingForKeyPress = false
                    map[key]()
                    break
                }
            }
    }

    getActiveFilters() {
        return this.watcher.options.pattern.map((pattern, index) => ({
            title: pattern,
            value: index,
        }))
    }

    addFilter(value = '') {
        const { length } = this.watcher.options.pattern
        this.watcher.options.pattern.push(value)
        if (!value) return this.prompts.editFilter(length)
    }
}
