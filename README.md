# react-native-dotenv [![NPM version](https://img.shields.io/npm/v/react-native-dotenv.svg?style=flat-square)](https://www.npmjs.com/package/react-native-dotenv) [![downloads](https://img.shields.io/npm/dw/react-native-dotenv)](https://www.npmjs.com/package/react-native-dotenv)

<img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" alt="dotenv" align="right" width="200" />

Load `.env` into React Native with `import` statements. A Babel plugin that inlines your environment variables at build time — with multi-environment support.

&nbsp;

## Usage

Install it.

```sh
npm install react-native-dotenv --save-dev
```

Add it to your Babel config:

```js
// babel.config.js
module.exports = function (api) {
  api.cache(false)
  return {
    plugins: [
      ['module:react-native-dotenv']
    ]
  }
}
```

Create a `.env` file in the root of your project:

```ini
# .env
HELLO="Dotenv"
API_URL=https://api.example.org
```

Import your environment variables:

```js
// App.js
import { HELLO, API_URL } from '@env'

console.log(`Hello ${HELLO}`)
fetch(`${API_URL}/users`)
```

That's it. Your environment variables from `.env` are available via `@env`!

```text
◇ injected env (2) from .env
```

&nbsp;

## Advanced

<details><summary>with the dotenv CLI</summary><br>

Use dotenv v18's `dotenv run` command when you want the same environment variables available to build tooling and your app's `@env` imports. The Babel plugin still inlines values into the app at build time.

Install dotenv directly so your package manager makes its CLI available to your project scripts:

```sh
npm install --save-dev dotenv@^18.0.1
```

Select a file when starting Metro:

```json
{
  "scripts": {
    "start:staging": "dotenv run -f .env.staging -- react-native start --reset-cache"
  }
}
```

```ini
# .env.staging
API_URL=https://staging.example.org
```

Keep the Babel plugin configured as shown in Usage, then import normally:

```js
import { API_URL } from '@env'

fetch(`${API_URL}/users`)
```

The CLI loads the selected file into the process environment before Metro starts. Existing shell/CI values win unless you pass `--override` to `dotenv run`. The plugin then gives non-empty process environment values priority over its own `.env` files.

The plugin still loads its usual files; `-f` selects the CLI's file, not the plugin's `path` or `APP_ENV`. This can change precedence: plain `dotenv run` loads `.env` into the process environment, so those values win over the plugin's `.env.local` values. Use the CLI when you intend its injected values to take priority.

With the default `safe: false`, keys loaded only by the CLI work through `@env` imports. With `safe: true`, those keys must also appear in files the plugin reads. Likewise, `process.env.X` is only inlined for keys in the plugin's files (plus `NODE_ENV`, `BABEL_ENV`, and `envName`).

Stop Metro and rerun the script after changing CLI-loaded values; its process environment is set at startup. The script resets Metro's cache when restarting.

The CLI is optional. For values used only by app code, the Babel plugin can continue loading `.env` files on its own.

</details>

<details><summary>with Expo 🧭</summary><br>

```js
// babel.config.js
module.exports = function (api) {
  api.cache(false)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv']
    ]
  }
}
```

```ini
# .env
HELLO="Universe"
```

```js
// app/index.tsx
import { HELLO } from '@env'
import { Text } from 'react-native'

export default function HomeScreen() {
  return <Text>Hello {HELLO}</Text>
}
```

Then start with a clean Metro cache: `npx expo start --clear`.

</details>

<details><summary><code>envName</code> (default: <code>'APP_ENV'</code>)</summary><br>

Override which environment variable selects the mode file (separate from `NODE_ENV`). Metro can overwrite the test environment even if you specify a config, so this gives you a dedicated override.

```json
// package.json
{
  "scripts": {
    "start:staging": "APP_ENV=staging npx react-native start"
  }
}
```

The above example would use the `.env.staging` file.

To use your own name:

```json
{
  "plugins": [
    ["module:react-native-dotenv", {
      "envName": "MY_ENV"
    }]
  ]
}
```

```json
// package.json
{
  "scripts": {
    "start:staging": "MY_ENV=staging npx react-native start"
  }
}
```

Note: if you're using `APP_ENV` (or `envName`), you cannot use `development` nor `production` as values, and you should avoid having a `.env.development` or `.env.production`. This is a Babel and Node thing that I have little control over unfortunately and is consistent with many other platforms that have an override option, like [Gatsby](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/#additional-environments-staging-test-etc). If you want to use `development` and `production`, you should not use `APP_ENV` (or `envName`), but rather the built-in `NODE_ENV=development` or `NODE_ENV=production` or you can just use `debug` vs `release` modes. It actually does compile but only for the `start` command so it is up to you but then you have to run `react-native start` every time you change the values.

</details>
<details><summary><code>moduleName</code> (default: <code>'@env'</code>)</summary><br>

The module name used in import statements.

```js
import { HELLO } from '@env'
```

For TypeScript or Next.js it is often advised to set `moduleName` to `react-native-dotenv`.

```json
{
  "plugins": [
    ["module:react-native-dotenv", {
      "moduleName": "react-native-dotenv"
    }]
  ]
}
```

</details>
<details><summary><code>path</code> (default: <code>'.env'</code>)</summary><br>

Path to the base env file.

```json
{
  "plugins": [
    ["module:react-native-dotenv", {
      "path": ".env"
    }]
  ]
}
```

</details>
<details><summary><code>allowlist</code> (default: <code>null</code>)</summary><br>

Limit imports to only these env variable names.

```json
{
  "plugins": [
    ["module:react-native-dotenv", {
      "allowlist": [
        "HELLO",
        "API_URL"
      ]
    }]
  ]
}
```

</details>
<details><summary><code>blocklist</code> (default: <code>null</code>)</summary><br>

Prevent these env variable names from being imported.

```json
{
  "plugins": [
    ["module:react-native-dotenv", {
      "blocklist": [
        "GITHUB_TOKEN"
      ]
    }]
  ]
}
```

</details>
<details><summary><code>safe</code> (default: <code>false</code>)</summary><br>

Only allow variables defined in your `.env` files. Host environment variables can still override values for those same keys at build time, but keys that exist only in the environment (and not in `.env`) are not imported.

```json
{
  "plugins": [
    ["module:react-native-dotenv", {
      "safe": true
    }]
  ]
}
```

When using safe mode, it's highly recommended to set `allowUndefined` to `false`.

</details>
<details><summary><code>allowUndefined</code> (default: <code>true</code>)</summary><br>

Allow importing undefined variables; their value will be `undefined`.

```json
{
  "plugins": [
    ["module:react-native-dotenv", {
      "allowUndefined": true
    }]
  ]
}
```

```js
import { UNDEFINED_VAR } from '@env'

console.log(UNDEFINED_VAR === undefined) // true
```

When set to `false`, an error will be thrown.

</details>
<details><summary><code>verbose</code> (default: <code>false</code>)</summary><br>

Also print the active dotenv mode to stderr while transforming.

```json
{
  "plugins": [
    ["module:react-native-dotenv", {
      "verbose": true
    }]
  ]
}
```

</details>
<details><summary><code>quiet</code> (default: <code>false</code>)</summary><br>

Suppress the stderr inject message (`◇ injected env (N) from .env`).

```json
{
  "plugins": [
    ["module:react-native-dotenv", {
      "quiet": true
    }]
  ]
}
```

</details>
<details><summary>process.env</summary><br>

You can also use `process.env` — the plugin inlines matching keys at build time the same way.

```js
console.log(`Hello ${process.env.HELLO}`)
fetch(`${process.env.API_URL}/users`)
```

`process.env.X` is only inlined when `X` is in your `.env` files (plus `NODE_ENV` / `BABEL_ENV` / `envName`). That keeps build-tooling noise out of the bundle without special-casing tool names.

For host/CI-only values, use `@env` imports — or put the key in `.env` and let CI override the value.

</details>
<details><summary>Multi-env</summary><br>

This package now supports environment specific variables. This means you may now import environment variables from multiple files, i.e. `.env`, `.env.development`, `.env.production`, and `.env.test`. This is based on [dotenv-flow](https://www.npmjs.com/package/dotenv-flow).

Note: it is not recommended that you commit any sensitive information in `.env` file to code in case your git repo is exposed. The best practice is to put a `.env.template` or `.env.development.template` that contains dummy values so other developers know what to configure. Then add your `.env` and `.env.development` to `.gitignore`. You can also keep sensitive keys in a separate `.env.local` (and respective `.env.local.template`) in `.gitignore` and you can use your other `.env` files for non-sensitive config.

If you are publishing your apps on an auto-publishing platform like EAS (Expo Application Services), make sure to put your secrets on the platform dashboard directly. If you are wondering what environment the platforms choose it is likely `.env.production` (not `.env.prod`) and there is likely no way to change this.

The base set of variables will be `.env` and the environment-specific variables will overwrite them.

The variables will automatically be pulled from the appropriate environment and `development` is the default. The choice of environment is based on your Babel environment first and if that value is not set, your NPM environment, which should actually be the same, but this makes it more robust.

In general, **Release** is `production` and **Debug** is `development`.

To choose, setup your scripts with `NODE_ENV` for each environment

```json
// package.json
{
  "scripts": {
    "start:development": "NODE_ENV=development npx react-native start",
    "start:production": "NODE_ENV=production npx react-native start"
  }
}
```

</details>
<details><summary>Types with Zod</summary><br>

Prefer [Zod](https://zod.dev) to validate your env and infer types — no hand-written `env.d.ts` needed.

```ts
import { z } from 'zod'

export const env = z.object({
  HELLO: z.string().min(1),
  API_URL: z.string().url()
}).parse({
  HELLO: process.env.HELLO,
  API_URL: process.env.API_URL
})

console.log(`Hello ${env.HELLO}`)
fetch(`${env.API_URL}/users`)
```

`env` is fully typed from the schema. If a value is missing or invalid, Zod throws at startup instead of failing later in production.

</details>
<details><summary>Reference Material</summary><br>

If you are not familiar with how dotenv or Babel work, make sure to read the following reference materials:

* [babel environments](https://babeljs.io/docs/en/6.26.3/babelrc#env-option)
* [dotenv documentation](https://www.npmjs.com/package/dotenv)
* [See the wiki for more troubleshooting tips](https://github.com/goatandsheep/react-native-dotenv/wiki/Multi-env-troubleshooting)

### How this works

This Babel plugin processes your `.env` files and your environment variables and replaces the references to the environment variables in your code before it runs. This is because the environment variables will no longer be accessible once the React Native engine generates the app outputs.

</details>
<details><summary>Caching</summary><br>

When using with [`babel-loader`](https://github.com/babel/babel-loader) with caching enabled you will run into issues where environment changes won’t be picked up.
This is due to the fact that `babel-loader` computes a `cacheIdentifier` that does not take your `.env` file(s) into account. The good news is that a recent update has fixed this problem as long as you're using a new version of Babel. Many react native libraries have not updated their Babel version yet so to force the version, add in your `package.json`:

```json
"resolutions": {
  "@babel/core": "^7.20.2",
  "babel-loader": "^8.3.0"
}
```

If this does not work, you should set `api.cache(false)` in your babel config, which resets Babel cache.

If you're using android, add a clean task to your run command: `react-native run-android --tasks clean,installDebug`

metro.config.js`resetCache: true`

You can easily clear the cache:

```shell
rm -rf node_modules/.cache/babel-loader/*
```

or reset all caches

`npm start -- --reset-cache`

or

`yarn start --reset-cache`

or

`yarn start --clear`

or

`jest --no-cache`

or

`expo r -c`

and

`expo start --clear`

or

`react-native clean`

or

`rm -rf .expo/web/cache`

or

[react-native-clean-project](https://www.npmjs.com/package/react-native-clean-project)

Maybe a solution for updating package.json scripts:

>     "cc": "rimraf node_modules/.cache/babel-loader/*,",
>     "android": "npm run cc && react-native run-android",
>     "ios": "npm run cc && react-native run-ios",

Or you can override the default `cacheIdentifier` to include some of your environment variables.

The tests that use `require('@env')` are also not passing.

For nextjs, you _must_ set `moduleName` to `react-native-dotenv`.

</details>

&nbsp;

## FAQ

<details><summary>How does this work?</summary><br/>

This Babel plugin reads your `.env` files at build time and replaces `@env` imports (and matching `process.env` references) with their values before the React Native bundle is generated. Runtime Node `process.env` is not available in the app the same way.

</details>
<details><summary>Can I put secrets in `.env`?</summary><br/>

No. Values are inlined into your JavaScript bundle. Anyone who unpacks your app can read them. Only put public config in `.env` — keep real secrets on a server.

</details>
<details><summary>Can I use this with Next.js?</summary><br/>

Yes. Set `moduleName` to `react-native-dotenv` (Next.js already owns `@env`).

```json
{
  "plugins": [
    ["module:react-native-dotenv", {
      "moduleName": "react-native-dotenv"
    }]
  ]
}
```

</details>
<details><summary>What about variable expansion?</summary><br/>

Use [dotenvx](https://github.com/dotenvx/dotenvx).

</details>
<details><summary>Should I commit my `.env` file?</summary><br/>

No.

Unless you encrypt it with [dotenvx](https://github.com/dotenvx/dotenvx). Then we recommend you do.

</details>
<details><summary>Can I use `process.env` instead?</summary><br/>

Yes. The plugin inlines matching keys at build time the same way as `@env` imports.

```js
console.log(`Hello ${process.env.HELLO}`)
fetch(`${process.env.API_URL}/users`)
```

</details>
<details><summary>Should I have multiple `.env` files?</summary><br/>

We recommend creating one `.env` file per environment. Use `.env` for local/development, `.env.production` for production and so on. This still follows the twelve factor principles as each is attributed individually to its own environment. Avoid custom set ups that work in inheritance somehow (`.env.production` inherits values from `.env` for example). It is better to duplicate values if necessary across each `.env.environment` file.

> In a twelve-factor app, env vars are granular controls, each fully orthogonal to other env vars. They are never grouped together as “environments”, but instead are independently managed for each deploy. This is a model that scales up smoothly as the app naturally expands into more deploys over its lifetime.
>
> – [The Twelve-Factor App](http://12factor.net/config)

Additionally, we recommend using [dotenvx](https://github.com/dotenvx/dotenvx) to encrypt and manage these.

This package also supports dotenv-flow-style files (`.env`, `.env.local`, `.env.<mode>`, `.env.<mode>.local`). See Multi-env under Advanced.

</details>
<details><summary>What about syncing and securing `.env` files?</summary><br/>

Use [dotenvx](https://github.com/dotenvx/dotenvx) to unlock syncing encrypted `.env` files over git.

</details>
<details><summary>Why aren't my environment variables updating?</summary><br/>

Usually cache. Clear Metro/Babel cache and restart:

```shell
npm start -- --reset-cache
# or
yarn start --reset-cache
# or
expo start --clear
```

Also set `api.cache(false)` in your Babel config (see Usage), or clear `node_modules/.cache/babel-loader/*`. See Caching under Advanced for more.

</details>
<details><summary>What if I accidentally commit my `.env` file to code?</summary><br/>

Remove it, [remove git history](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) and then install the [git pre-commit hook](https://github.com/dotenvx/dotenvx#pre-commit) to prevent this from ever happening again.

```
npm i -g @dotenvx/dotenvx
dotenvx precommit --install
```

</details>
<details><summary>Why can't I use `APP_ENV=development` or `production`?</summary><br/>

Babel/Node treat `development` and `production` specially. If you use `APP_ENV` (or `envName`), avoid those values — use something like `staging` / `release` instead. Prefer built-in `NODE_ENV=development` / `NODE_ENV=production` when you need those modes. See `envName` under Advanced.

</details>
<details><summary>Why is `import` from `@env` failing with module not found?</summary><br/>

`@env` is a virtual module created by this Babel plugin — it is not an npm package. Make sure `module:react-native-dotenv` is in your Babel config, restart Metro with a cache reset, and that your `moduleName` option matches the import (default `@env`).

</details>
<details><summary>How do I get TypeScript types for my environment variables?</summary><br/>

Prefer [Zod](https://zod.dev) to validate and infer types — see Types with Zod under Advanced.

</details>
<details><summary>What happens to environment variables that were already set?</summary><br/>

By default, we will never modify any environment variables that have already been set. In particular, if there is a variable in your `.env` file which collides with one that already exists in your environment, then that variable will be skipped (the existing value wins at build time).

`process.env.X` is only inlined when `X` appears in a `.env` file. Host/CI-only keys still work via `import { X } from '@env'`.

</details>
&nbsp;

## CHANGELOG

See [CHANGELOG.md](CHANGELOG.md)

&nbsp;

## Who's using react-native-dotenv?

[These npm modules depend on it.](https://www.npmjs.com/browse/depended/react-native-dotenv)

Projects that expand it often use the [keyword "dotenv" on npm](https://www.npmjs.com/search?q=keywords:dotenv).

&nbsp;

## Credits

Long maintained by [Kemal Ahmed](https://guidebolt.com) ([@goatandsheep](https://github.com/goatandsheep)).
