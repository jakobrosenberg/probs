export const defaults = {
    runner: 'worker',
    haltOnErrors: false,
    glob: '**/*.{test,spec}.{js,mjs,ts}',
    ignore: '**/node_modules',
    concurrency: 5,
    globals: true
}