import { ConsoleReporter } from './reporters/consoleReporter/consoleReporter.js'

export const defaults = {
    reporter: ConsoleReporter(),
    runner: 'worker',
    haltOnErrors: false
}