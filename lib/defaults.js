import { ConsoleReporter } from './reporters/consoleReporter/consoleReporter.js'

export const defaults = {
    reporter: 'ConsoleReporter',
    runner: 'worker',
    haltOnErrors: false,
    glob: '**/*.{test,spec}.{js,mjs,ts}',
    ignore: '**/node_modules',
    concurrency: 5,
    globals: true
}