import { rmSync, mkdirSync, writeFileSync } from 'fs'
import { createDirname, delay } from "../../../util.js";
const __dirname = createDirname(import.meta)
const tmpDir = __dirname + '/temp'
const file = tmpDir + '/timestamp.json'

export default {
    setupDir: async id => {
        await delay(1000)
        mkdirSync(tmpDir, { recursive: true })
        writeFileSync(file, 'bar')
    },
    teardownDir: async id => {
        rmSync(tmpDir, { recursive: true })
    }
}