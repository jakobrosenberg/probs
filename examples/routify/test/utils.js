
// import { createServer } from 'vite'

// console.log(process.env.CI)
// console.log(process.env.$CI)
// console.log(process.env.FOO)
// console.log(process.env.$FOO)

// const viteServer = await createServer()
// const listen = await viteServer.listen(5000)
// await viteServer.close()

import { createServer } from 'vite'
// await listen.close()
// const listen = await viteServer.httpServer.listen(1234)
// // import { dirname } from 'path';
// // import { fileURLToPath } from 'url';


// export const createDirname = meta => dirname(fileURLToPath(meta.url));

// process.env.CI='true'

export const startServer = async () => {
    const server = await createServer({
        // any valid user config options, plus `mode` and `configFile`
        // configFile: 'vite.config.js',
        // root: createDirname(import.meta) + '/..',
    })
    await server.listen()

    server.printUrls()
    return server
}

// const handle = await startServer()

// setTimeout(async () => {
//     // await handle.watcher.close()
//     await handle.close()
//     // process.stdin.resume()
//     console.log('close')
// }, 3000)
