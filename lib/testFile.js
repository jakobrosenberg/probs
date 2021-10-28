import { resolve } from 'path'
import { pathToFileURL } from 'url';
import { createTestRunner } from './test.js'
import assert from 'assert'

/**  */

export const testFile = async (file, options = {}) => {
    const { reporter } = options

    if(options.globals){
        // @ts-ignore annoying jest
        global.test = createTestRunner(false, [file], reporter)
        // @ts-ignore annoying jest    
        global.asyncTest = createTestRunner(true, [file], reporter)
        // @ts-ignore annoying jest    
        global.assert = assert
        global._bestestFile = file
    }
    await import(pathToFileURL(file).href)
}