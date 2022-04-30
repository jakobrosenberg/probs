# probs

wip testing framework

## Features

### Custom Globals

**Probs** lets you set your own globals or overwrite the included ones.
To do this, we use `setupFile`.
Since each file runs in a separate worker, there's no risk of polluting the globals or prototypes of other test files.

```javascript
// probs.config.js

export default {
  setupFile: async (id) => {
    // we're only providing a browser for files that match test/e2e/**
    if (id.match('test/e2e/')) {
      global.browser = await chromium.launch()
    }
  },
}
```

### Custom Context

Each test provides context to its callback. We can set the scope by adding a `context` to our config.
The `context` function will serve as middleware for the existing scope.

```javascript
// probs.config.js

export default {
  context: (ctx) => {
    ctx.scopeString = ctx.scope.join(' > ')
    return ctx
  },
}
```

```javascript
// test/file.test.js

test('can access context', (test, { scopeString }) => {
  assert.equal(scopeString, 'test/file.test.js > can access context')
})
```

### Worker configuration
Each test runs inside its own worker. To configure a worker, we can add `worker` to the config.

```javascript
// probs.config.js

export default {
  worker: (ctx) => ({
    env: { environment: 'test' },
    execArgv: ['--experimental-loader', 'svelte-esm-loader', '--no-warnings'],
  }),
}
```

*For a full list of options, please refer to https://nodejs.org/api/worker_threads.html#new-workerfilename-options*

### How it Works

Each test file gets a dedicated worker which runs the test file.

A worker lifecycle boils down to:
1. set globals
2. run `setupFile` callback
3. import testFile
