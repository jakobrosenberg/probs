import { spawnSync } from 'child_process'
import { dirname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { green, red, yellow } from 'colorette'


export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const createDirname = meta => dirname(fileURLToPath(meta.url));

const __dirname = createDirname(import.meta)


export const testDir = (path, _args = []) => {
    const cwd = resolve(__dirname, '..')
    const dir = relative(cwd, path)
    const args = ['lib/cli', dir, '--reporter JsonReporter', ..._args]

    const spawnReturn = spawnSync('node', args, { cwd, shell: true, encoding: 'utf8' })
    const result = spawnReturn.output
    const cmd = ['node', ...args].join(' ')


    if (spawnReturn.stderr) {
        return {
            err: result.join(''),
            dir,
            cmd,
            msg: red(`failed to run "${cmd}"\n`) + result.join('')
        }
    }


    try {
        const json = JSON.parse(result.slice(1, -1).join(''))
        return {
            result: json,
            msg: !json.err ? '' : createError(dir, cmd, json.err?.map(
                err => ['TEST: ' + yellow(err.scope.join(' > ')), err.text].join('\r\n\r\n')).join('\r\n\r\n')),
            dir,
            cmd,
        }
    } catch (err) {
        throw Error(createError(dir, cmd, err))
    }
}

const createError = (dir, cmd, err) => red(`Failed to test dir: `) +
    `${dir}\n` +
    `cmd: ${yellow(cmd)}\n` +
    err +
    '\n'