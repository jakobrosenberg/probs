
export default {
    setupFile: id => {
        global.globalFoo = 'foo'
    },
    context: (scope) => {
        return { scope }
    }
}


// todo change test setup to iterate over each folder synchronously, treating each as an environment with its own config
