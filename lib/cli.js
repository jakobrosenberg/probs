import { program } from 'commander'
import { resolver } from './resolver.js'


const splitByComma = str => str.split(',')

program
    .argument('<path>', 'one or multiple paths separated by comma', splitByComma)
    .option('-m --glob [glob]', 'glob pattern to match', '**/*.test.js')
    .option('-g --no-globals', 'disable globals')
    .action(resolver)

program.parse()