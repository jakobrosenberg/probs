/** @type {ProbsConfig} */
const options = {
    setupFile(){
        global.msgFromSetup = 'I was set by setupFile'
    }
}

export default options
