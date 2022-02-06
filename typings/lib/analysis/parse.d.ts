export function analyzeFile(path: any): Promise<{
    tree: any;
    duration: number;
    tests: ProbsAnalysisNode[];
}>;
export function analyzeStr(str: any): {
    tree: any;
    duration: number;
    tests: ProbsAnalysisNode[];
};
export class ProbsAnalysisNode {
    constructor(node: any, parent: any);
    /** @type {Object<string, ProbsAnalysisNode>} */
    children: {
        [x: string]: ProbsAnalysisNode;
    };
    name: any;
    start: any;
    end: any;
    /** @type {acorn.Node} */
    body: acorn.Node;
    parent: any;
    get scope(): any[];
}
export type Tree = {
    children: {
        [x: string]: ProbsAnalysisNode;
    }[];
    duration: number;
    tests: any;
};
