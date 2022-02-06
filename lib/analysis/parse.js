import { promises } from 'fs'
import { Parser } from 'acorn'

/**
 *  @typedef {Object} Tree
 *  @prop {Object<string, ProbsAnalysisNode>[]} children
 *  @prop {number} duration
 *  @prop {any} tests
 **/

/**
 * @param {Tree} tree
 */
const createTestsFromTree = tree => {
    /**
     * @type {(ProbsAnalysisNode)[]}
     */
    const tests = []

    /**
     * @param {ProbsAnalysisNode | Tree} node
     * @param {string[]} scope
     */
    const parseNode = (node, scope = []) => {
        if (node instanceof ProbsAnalysisNode) tests.push(node)
        Object.entries(node.children).forEach(([testName, childNode]) => {
            parseNode(childNode, [...scope, testName])
        })
    }

    parseNode(tree)

    const sortedTests = tests.sort((a, b) => a.body.start - b.body.start)
    return sortedTests
}

export const analyzeFile = async path =>
    analyzeStr(await promises.readFile(path, { encoding: 'utf-8' }))

export const analyzeStr = str => {
    const startedAt = Date.now()

    const node = Parser.parse(str, {
        sourceType: 'module',
        ecmaVersion: 'latest',
    })
    const tree = getTestsFromNode(node)
    return {
        tree,
        duration: Date.now() - startedAt,
        tests: createTestsFromTree(tree),
    }
}

export class ProbsAnalysisNode {
    /** @type {Object<string, ProbsAnalysisNode>} */
    children = {}

    constructor(node, parent) {
        this.name = node.arguments[0].value
        this.start = node.start
        this.end = node.end
        const lambda = node.arguments[1]
        /** @type {acorn.Node} */
        this.body = lambda.body
        this.parent = parent
        getTestsFromNode(this.body, this)
    }

    get scope() {
        let node = this
        const scope = [node.name]
        while ((node = node.parent)) if (node.name) scope.unshift(node.name)
        return scope
    }
}

/**
 * @param {*} node
 * @param {*} branch
 * @returns
 */
const getTestsFromNode = (node, branch = { children: {} }) => {
    const testNames = ['test', 'it']

    if (node.type === 'AwaitExpression' && node.argument.callee === 'test') {
        console.log('found await expression', node)
        node = node.argument
    }

    if (testNames.includes(node.callee?.name))
        branch.children[node.arguments[0].value] = new ProbsAnalysisNode(node, branch)
    else {
        Object.values(node).forEach(value => {
            if (value && typeof value !== 'string') getTestsFromNode(value, branch)
        })
    }
    return branch
}
