import { createReporter } from './reporters/consoleReporter.js'

export const defaults = {
    reporter: createReporter(),
    haltOnErrors: false
}