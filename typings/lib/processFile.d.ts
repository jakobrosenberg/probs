export function processFile(file: string, emitter: (eventName: ProbEvents, params: {}) => void, options?: any): Promise<void>;
export function runFileWithoutWorker(file: string, emitter: (eventName: ProbEvents, params: {}) => void, options?: any): Promise<void>;
