export default {
    worker: (ctx) => ({
        execArgv: ['--experimental-loader', 'svelte-esm-loader', '--no-warnings']
    })
}