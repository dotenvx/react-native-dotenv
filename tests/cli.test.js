const { execFileSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

describe('dotenv run integration', () => {
  let directory
  let env
  const dotenvPackagePath = require.resolve('dotenv/package.json')
  const cli = path.resolve(path.dirname(dotenvPackagePath), require(dotenvPackagePath).bin.dotenv)

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'react-native-dotenv-cli-'))
    env = { ...process.env }
    for (const key of Object.keys(env)) {
      if (/^(DOTENV_|RN_DOTENV_CLI_)/.test(key) || ['NODE_ENV', 'BABEL_ENV', 'APP_ENV'].includes(key)) {
        delete env[key]
      }
    }
    fs.writeFileSync(path.join(directory, '.env'), 'RN_DOTENV_CLI_URL=base\n')
    fs.writeFileSync(path.join(directory, '.env.local'), 'RN_DOTENV_CLI_URL=local\n')
    fs.writeFileSync(path.join(directory, '.env.staging'), 'RN_DOTENV_CLI_URL=staging\nRN_DOTENV_CLI_ONLY=extra\n')
  })

  afterEach(() => {
    fs.rmSync(directory, { recursive: true, force: true })
  })

  function transform (args, source, options = {}) {
    const script = `
      const { transformSync } = require(${JSON.stringify(require.resolve('@babel/core'))})
      const result = transformSync(${JSON.stringify(source)}, {
        configFile: false,
        babelrc: false,
        plugins: [[${JSON.stringify(require.resolve('../index.js'))}, ${JSON.stringify({ quiet: true, ...options })}]]
      })
      console.log(result.code)
    `
    return execFileSync(process.execPath, [cli, 'run', '-q', ...args, '--', process.execPath, '-e', script], {
      cwd: directory,
      env,
      encoding: 'utf8'
    }).trim()
  }

  it('inlines CLI values through imports while leaving CLI-only process.env references intact', () => {
    expect(transform(['-f', '.env.staging'],
      'import { RN_DOTENV_CLI_URL, RN_DOTENV_CLI_ONLY } from "@env"; console.log(RN_DOTENV_CLI_URL, RN_DOTENV_CLI_ONLY, process.env.RN_DOTENV_CLI_URL, process.env.RN_DOTENV_CLI_ONLY)'
    )).toBe('console.log("staging", "extra", "staging", process.env.RN_DOTENV_CLI_ONLY);')
  })

  it('preserves safe mode restrictions on CLI-only imports', () => {
    expect(transform(['-f', '.env.staging'],
      'import { RN_DOTENV_CLI_URL, RN_DOTENV_CLI_ONLY } from "@env"; console.log(RN_DOTENV_CLI_URL, RN_DOTENV_CLI_ONLY)',
      { safe: true }
    )).toBe('console.log("staging", undefined);')
  })

  it('gives shell values priority unless the CLI uses --override', () => {
    env.RN_DOTENV_CLI_URL = 'shell'
    const source = 'import { RN_DOTENV_CLI_URL } from "@env"; console.log(RN_DOTENV_CLI_URL)'
    expect(transform(['-f', '.env.staging'], source)).toBe('console.log("shell");')
    expect(transform(['--override', '-f', '.env.staging'], source)).toBe('console.log("staging");')
  })

  it('gives CLI-loaded .env values priority over plugin-loaded .env.local values', () => {
    expect(transform([], 'import { RN_DOTENV_CLI_URL } from "@env"; console.log(RN_DOTENV_CLI_URL)'))
      .toBe('console.log("base");')
  })
})
