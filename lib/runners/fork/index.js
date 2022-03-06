import { fork as _fork } from 'child_process'
import { pathToFileURL } from 'url'
import { createDirname } from '../../utils/misc.js'
import { createRequire } from 'module'

const __dirname = createDirname(import.meta)
const require = createRequire(__dirname)

const esmChainLoaderUrl = pathToFileURL(require.resolve('esm-chain-loader'))
const testLoaderUrl = pathToFileURL(__dirname + '/../../testLoader.js')

export const fork = (file, { reporter, ...options }) =>
    new Promise((resolve, reject) => {
        reporter.openedFile({ scope: [file] })

        const workerOptions = options.worker ? options.worker({ file }) : {}

        const child = _fork(__dirname + '/fork.js', {
            ...(options.worker ? options.worker({ file }) : {}),
            execArgv: [
                '--enable-source-maps',
                '--no-warnings',
                ...(workerOptions.execArgv || []),
                '--experimental-loader',
                testLoaderUrl.href,
                '--experimental-loader',
                esmChainLoaderUrl.href,
            ],
            env: {
                __probsConfig: JSON.stringify(options),
            },
        })

        child.on('message', msg => {
            if (msg === 'child_ready') {
                child.send({ task: { file, options } })
            }
            if (msg.report) {
                const { event, ...args } = msg.report
                if (reporter[event]) reporter[event]({ ...args })
                else if (reporter.catch) reporter.catch(event, { ...args })
            }
        })
        child.on('error', reject)
        child.on('exit', code => {
            if (code !== 0) reject(new Error(`Fork stopped with exit code ${code}`))
            else resolve()
        })
    })
