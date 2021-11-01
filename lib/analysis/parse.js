import { readFile, readFileSync } from 'fs'
import { Parser } from 'acorn'

export const analyzeFile = path => new Promise((resolve, reject) => {
    readFile(path, { encoding: 'utf-8' }, (err, content) => {
        const startedAt = Date.now()
        if (err) reject(err)
        const node = Parser.parse(content, { sourceType: 'module', ecmaVersion: 'latest' })
        const result = getTestsFromNode(node)
        result.duration = Date.now() - startedAt
        resolve(result)
    })
})

export class ProbsAnalysisNode {
    children = {}

    constructor(node) {
        this.name = node.arguments[0].value
        this.start = node.start
        this.end = node.end
        const body = node.arguments[1]
        getTestsFromNode(body, this)
    }
}

const getTestsFromNode = (node, branch = { children: {} }) => {
    const testNames = ['test', 'it']

    if (testNames.includes(node.callee?.name))
        branch.children[node.arguments[0].value] = (new ProbsAnalysisNode(node))
    else {
        Object.values(node).forEach(value => {
            if (value && typeof value !== 'string')
                getTestsFromNode(value, branch)
        })
    }
    return branch
}

analyzeFile('test/nested/nested.test.js').then(r => console.log(r))