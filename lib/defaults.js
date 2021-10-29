import { createReporter } from './reporters/consoleReporter/consoleReporter.js'

export const defaults = {
    reporter: createReporter(),
    haltOnErrors: false
}