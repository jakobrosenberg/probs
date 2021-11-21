import { createParallelHooksCollection } from 'hookar';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export const createDirname = meta => dirname(fileURLToPath(meta.url));

export const resolveConfigFile = async configPath => {
    try {
        if (configPath) return import('file:///' + resolve(configPath)).then(r => r.default)
        try {
            return await import('file:///' + process.cwd() + '/probs.config.js').then(r => r.default)
        } catch (_err) {
            if (_err.code === 'ERR_MODULE_NOT_FOUND')
                return {}
            throw _err
        }
    } catch (err) {
        console.log(`failed to import config: "${configPath}"`)
        throw err
    }
}

export const createHooksCollection = () => {
    let beforeAllPromise
    return {
        beforeAll: cb => {
            if (!beforeAllPromise && cb)
                beforeAllPromise = cb()            
            return beforeAllPromise
        },
        afterAll: createParallelHooksCollection(),
        beforeEach: createParallelHooksCollection(),
        afterEach: createParallelHooksCollection()
    }
}