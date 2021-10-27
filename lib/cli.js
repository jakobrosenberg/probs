import { program } from 'commander'
import { resolver } from './resolver.js'


const splitByComma = str => str.split(',')

program
    .argument('<path>', 'one or multiple paths separated by comma', splitByComma)
    .option('[glob]', 'glob pattern to match', '**/*.test.js')
    .action(resolver)

program.parse()