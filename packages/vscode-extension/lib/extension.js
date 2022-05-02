const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  const ctrl = vscode.tests.createTestController("probsTestController", "Probs");
  const item = ctrl.createTestItem("foobar", "foo bar");

  const nestedItem = ctrl.createTestItem("nestedThing", "nested thing");
  item.children.add(nestedItem);

  ctrl.items.add(item);

  const runProfile = ctrl.createRunProfile("run", vscode.TestRunProfileKind.Run, (request, token) => {
    console.log({ request, token });
    const run = ctrl.createTestRun(request);
    run.enqueued(nestedItem);
    run.started(item);
    setTimeout(() => run.started(nestedItem), 1000);
    setTimeout(() => run.passed(nestedItem), 2000);
    setTimeout(() => run.passed(item), 3000);
    setTimeout(() => run.end(), 3500);
  });

  /**
   * @returns {vscode.TestItem}
   */
  const upsertTest = () => null;

  //   ctrl.createRunProfile("debug", vscode.TestRunProfileKind.Debug, () => {});

  /**
   * @param {vscode.TestRunRequest} request
   * @param {vscode.CancellationToken} cancellation
   */
  const runHandler = (request, cancellation) => {
    /**
     * @param {Iterable<vscode.TestItem>} tests
     */
    const discoverTests = async (tests) => {
      for (const test of tests) {
      }
    };
  };
}

module.exports = { activate };
