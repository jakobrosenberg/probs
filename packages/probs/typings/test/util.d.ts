export function delay(ms: any): Promise<any>;
export function createDirname(meta: any): string;
export function testDir(path: any, _args?: any[]): {
    err: string;
    dir: string;
    cmd: string;
    msg: string;
    result?: undefined;
} | {
    result: any;
    msg: string;
    dir: string;
    cmd: string;
    err?: undefined;
};
