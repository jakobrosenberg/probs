# probs

wip testing framework

## Features

### Custom Globals

Probs lets use set your own globals or overwrite the included ones.
To do this, we use `setupFile`.
Since each file runs in a separate worker, there's no risk of polluting the globals or prototypes of other test files.

```javascript
// probs.config.js

export default {
  setupFile: async (id) => {
    // we're only providing a browser for each file that match test/e2e/**
    if (id.match('test/e2e/')) {
      global.browser = await chromium.launch()
    }
  },
}
```

### Custom Context

Each test provides context to its scope. We can set the scope by adding a `context` to our config.
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
