/// <reference types="probs" />

import { webkit } from "playwright";

/** @type {ProbsConfig} */
const options = {
  setupFile: async () => {
    global["browser"] = await webkit.launch();
    global["context"] = await global["browser"].newContext();
    global["page"] = await global["context"].newPage();
  },
  teardownFile: async () => {
    global["browser"].close();
    global["context"].close();
    global["page"].close();
  },
  worker: ({ file }) => {
    return {
      execArgv: ["--experimental-loader", "svelte-esm-loader", "--no-warnings"],
    };
  },
};
export default options;
