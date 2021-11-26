export function FlatReporter(verbose: any): {
    addedFile: ({ scope }: {
        scope: any;
    }) => void;
    openedFile: ({ scope }: {
        scope: any;
    }) => void;
    closedFile: ({ scope }: {
        scope: any;
    }) => void;
    startedTest: ({ scope }: {
        scope: any;
    }) => void;
    finishedAllTests: () => void;
    finishedTest: ({ scope, status, err, ownStatus, ...rest }: {
        [x: string]: any;
        scope: any;
        status: any;
        err: any;
        ownStatus: any;
    }) => void;
};
