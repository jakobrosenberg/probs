global.foo = 'foooo'

await import ('./child.js')
global.foo = 'baaar'
import ('./child2.js')