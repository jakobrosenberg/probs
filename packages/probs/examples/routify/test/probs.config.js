/// <reference types="probs" />

import { webkit } from "playwright";
import { startServer } from "./utils.js";

let server

/** @type {ProbsConfig} */
const options = {
  setupDir: async () => {
    server = await startServer()
  },
  teardownDir: async () => {
    await server.close()
  },
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
  worker: ({ file }) => ({ execArgv: ["--experimental-loader", "svelte-esm-loader", "--no-warnings"] }),
};

export default options;
