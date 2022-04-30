import readline from 'readline'
readline.emitKeypressEvents(process.stdin)

if (process.stdin.isTTY) process.stdin.setRawMode(true)

let count = 0

const restart = lines => {
    // console.log('restart')
    // console.log('Terminal size: ' + process.stdout.columns + 'x' + process.stdout.rows);
    for (let i = 0; i < 10; i++)
        process.stdout.write(`\r\nfoobar${count++}`.padEnd(process.stdout.columns))
    process.stdout.moveCursor(0, -10)
}
const pattern = () => {
    console.log('pattern')
}

process.stdin.on('keypress', (chunk, key) => {
    if (key?.name === 'q' || key?.sequence === '\x03') process.exit()
    if (key?.name === 'r') restart()
    if (key?.name === 'p') pattern()
})

// process.stdout.write('\rfoobar2')
// process.stdout.write('\rfoobar3')
// process.stdout.write('\rfoobar4')

const items = [
    { name: 'Quit [q]', value: 'quit' },
    { name: 'Restart [r]', value: 'restart' },
    { name: 'Select tests [s]', value: 'selectTests' },
    { name: 'Set filter [f]', value: 'setFilter' },
]

const block = {
    name: 'action',
    items: [
        { name: 'Quit [q]', value: 'quit' },
        { name: 'Restart [r]', value: 'restart' },
        { name: 'Select tests [s]', value: 'selectTests' },
        { name: 'Set filter [f]', value: 'setFilter' },
    ],
}

class BaseBox {
    /** @type {BaseBox[]} */
    children = []
    /**
     *
     * @param {string} x
     * @param {string} y
     * @param {string} width
     * @param {string} height
     */
    constructor(x, y, width, height) {
        this._x = x
        this._y = y
        this._width = width
        this._height = height
    }

    _getOuterX() {
        return Math.max(this.children.map(child => child.getX() + child.getWidth()))
    }

    getX() {
        return 0
    }

    getY() {
        return 0
    }

    /**
     * @returns {Number}
     */
    getWidth() {
        if (this._width === 'auto') return this._getOuterX()
        const match = this._width.match(/([0-9]*.?[0-9]+)((ch)|(%))$/)
        if (match) {
            const [_, value, metric] = match
            return metric === 'ch' ? Number(value) : process.stdout.columns
        }
    }
    setWidth(width) {
        this._width = width
    }

    /**
     * @returns {Number}
     */
    getHeight() {
        const match = this._height.match(/([0-9]*.?[0-9]+)((ch)|(%))$/)
        if (!match) throw new Error('height should be 100ch or 100%')
        const [_, value, metric] = match
        return metric === 'ch' ? Number(value) : process.stdout.readableHighWaterMark
    }
    setHeight(height) {
        this._height = height
    }
}

class App extends BaseBox {}

const app = new App('auto', '2px', '3', '4')