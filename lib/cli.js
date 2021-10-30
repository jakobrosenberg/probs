#!/usr/bin/env node

import { Option, program } from 'commander'
import { runner } from './runner.js'


const splitByComma = str => str.split(',')

program
    .argument('<path>', 'one or multiple paths separated by comma', splitByComma)
    .option('-m --glob [glob]', 'glob pattern to match', '**/*.test.js')
    .option('-g --no-globals', 'disable globals')
    .option('-p --pattern <pattern>', 'only run tests that match this pattern, comma separated', splitByComma)
    .option('-r --reporter <name>', '', 'ConsoleReporter')
    .addOption(new Option('-w --workers <count>', 'number of workers to use').default(5).argParser(Number))
    .action(runner)

program.parse()