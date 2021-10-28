import { resolve } from 'path'
import { pathToFileURL } from 'url';
import { createTestRunner } from './bestest.js'
import assert from 'assert'

export const testFile = async (file, options = {}) => {
    const { reporter } = options
    // @ts-ignore annoying jest
    global.test = createTestRunner(false, [file], reporter)
    global.asyncTest = createTestRunner(true, [file], reporter)
    global._bestestFile = file
    global.assert = assert
    await import(pathToFileURL(file).href)
}