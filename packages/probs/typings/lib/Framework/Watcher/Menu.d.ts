export class Menu {
    /**
     * @param {import('./Watcher').Watcher} watcher
     */
    constructor(watcher: import('./Watcher').Watcher);
    waitingForKeyPress: boolean;
    isOpen: boolean;
    watcher: import("./Watcher").Watcher;
    prompts: {
        menu: () => Promise<void>;
        testFilterMenu: () => Promise<void>;
        filter: (index: any) => Promise<void>;
        editFilter: (index: any) => Promise<void>;
        selectTests: () => Promise<void>;
        updateSnapshots: () => void;
    };
    home(): Promise<void>;
    getActiveFilters(): any;
    addFilter(value?: string): Promise<void>;
}
