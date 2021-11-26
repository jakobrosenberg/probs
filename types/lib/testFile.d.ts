export function testFile(file: string, options?: any): Promise<void>;
export function runFileWithWorker(file: any, { reporter, ...options }: {
    [x: string]: any;
    reporter: any;
}): Promise<any>;
export function runFileWithoutWorker(file: string, options?: any): Promise<void>;
