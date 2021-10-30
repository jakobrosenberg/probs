import { resolve } from 'path'
import { pathToFileURL } from 'url';
import { createTest } from './test.js'
import assert from 'assert'

/**  */

export const testFile = async (file, options = {}) => {
    const { reporter } = options

    if(options.globals){
        // @ts-ignore annoying jest
        global.test = createTest([file], options)
        // @ts-ignore annoying jest    
        global.assert = assert
        global._testlyFile = file
    }
    await import(pathToFileURL(file).href)
}