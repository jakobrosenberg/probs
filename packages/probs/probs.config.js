import { testDir } from "./test/util.js"
import { dirname } from 'path'

const replacePlaceholder = map => input => input.replace(/%(.+?)%/g, (_all, word) => map[word])


export default {
    setupFile: id => {
        global.filename = id

        global.testDir = (name, args) => {
            const map = { dirname: dirname(id) }
            args = args.map(replacePlaceholder(map))
            return testDir(`${dirname(id)}/_tests/${name}`, args)
        }
    },
    context: (ctx) => {
        return { ...ctx, scopeString: ctx.scope.join(' > ') }
    }
}