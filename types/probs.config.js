
/**
 * probs.config.js
 * @typedef {object} ProbsConfigOptions
 * @prop {'serial'|'parallel'} testConcurrencyMode
 * @prop {({file:string})=>WorkerOptions|import("child_process").ForkOptions} worker
 * @prop {ProbsConfigFileHook} setupFile script that runs before each file. Runs in main thread
 * @prop {ProbsConfigFileHook} teardownFile script that runs after each file. Runs in main thread
 * @prop {function(ProbsConfigContextCtx):ProbsConfigContextCtx} context
 *
 * @prop {string} glob
 * @prop {boolean} haltOnErrors
 * @prop {'worker'|'fork'} runner
 * @prop {string[]|string} ignore
 * @prop {number} concurrency
 */

/**
 * @callback ProbsConfigFileHook
 * @param {string} file
 * @param {ProbsConfigFileHookContext} ctx
 */

/**
 * @typedef {Object} ProbsConfigFileHookContext
 * @prop {Partial<ProbsOptions & ProbsConfigOptions>} options
 */