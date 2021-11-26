export namespace baseReporter {
    function addedFile({ scope }: {
        scope: any;
    }): void;
    function openedFile({ scope }: {
        scope: any;
    }): void;
    function closedFile({ scope }: {
        scope: any;
    }): void;
    function startedTest({ scope }: {
        scope: any;
    }): void;
    function finishedTest({ scope, status, ownErr }: {
        scope: any;
        status: any;
        ownErr: any;
    }): void;
    function finishedAllTests(): void;
}
