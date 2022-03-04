import { createServer } from 'vite'

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
