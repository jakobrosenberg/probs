#!/usr/bin/env node

import { Option, program } from 'commander'
import { defaults } from './defaults.js'
import { probs } from './probs.js'

const splitByComma = str => str.split(',')

program
    .argument('<path>', 'one or multiple paths separated by comma', splitByComma)
    .option('-m --glob <glob>', 'glob pattern to match', defaults.glob)
    .option(
        '-i --ignore <glob>',
        'ignore anything matching this pattern',
        defaults.ignore,
    )
    .option(
        '-p --pattern <pattern>',
        'only run tests that match this pattern, comma separated',
        splitByComma,
    )
    .option('-r --reporter <name>', '', 'consoleReporter')
    .option('-c --config <path>', 'path to config')
    .option('-g --no-globals', 'disable globals')
    .option('   --runner <name>', 'runner to use for files', defaults.runner)
    .addOption(
        new Option('--timeout <number>', 'timeout for individual tests')
            .default(defaults.timeout)
            .argParser(Number),
    )
    .addOption(
        new Option(
            '--concurrency <count>',
            'max number of test files to run simultaneously',
        )
            .default(defaults.concurrency)
            .argParser(Number),
    )
    .action((path, options) => {
        probs(path, options)
    })

program.parse()
