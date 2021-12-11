import { rmSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from 'fs'
import { createDirname, delay } from "../../util.js";
const __dirname = createDirname(import.meta)
const tmpDir = __dirname + '/temp'
const parentTmpDir = __dirname + '/../temp'
const file = tmpDir + '/timestamp.json'
const parentFile =parentTmpDir + '/timestamp.json'


test('waits for dirSetup', () => {
    const value = readFileSync(file, 'utf-8')
    assert.equal(value, 'bar')
})
test('waits for parent dirSetup', () => {
    const value = readFileSync(parentFile, 'utf-8')
    assert.equal(value, 'foo')
})