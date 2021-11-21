import { createDirname, testDir } from "../util.js"
const __dirname = createDirname(import.meta)

test('before-all runs before all', ()=>{
    const result = testDir(`${__dirname}/example`)
    // console.log(result)
})