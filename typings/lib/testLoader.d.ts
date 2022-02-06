export function transformSource(source: any, opts: any): Promise<{
    source: any;
}>;
export function _transform(content: string, file?: string): Promise<{
    content: string;
    sourcemap: import("magic-string").SourceMap;
}>;
