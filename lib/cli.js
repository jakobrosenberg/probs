#!/usr/bin/env node

import { Option, program } from 'commander'
import { probs } from './probs.js'


const splitByComma = str => str.split(',')

program
    .argument('<path>', 'one or multiple paths separated by comma', splitByComma)
    .option('-m --glob <glob>', 'glob pattern to match', '**/*.{test,spec}.js')
    .option('-i --ignore <glob>', 'ignore anything matching this pattern', '**/node_modules')
    .option('-p --pattern <pattern>', 'only run tests that match this pattern, comma separated', splitByComma)
    .option('-r --reporter <name>', '', 'ConsoleReporter')
    .option('-c --config <path>', 'path to config')
    .option('-g --no-globals', 'disable globals')
    .addOption(new Option('-w --workers <count>', 'number of workers to use').default(5).argParser(Number))
    .action(probs)

program.parse()