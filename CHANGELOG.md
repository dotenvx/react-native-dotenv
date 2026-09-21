# Changelog

All notable changes to this project are documented in this file.

## [Unreleased](https://github.com/dotenvx/react-native-dotenv/compare/v5.0.0...main)

## [5.0.0](https://github.com/dotenvx/react-native-dotenv/compare/v4.1.1...v5.0.0) (2026-09-21)

### Added

- Add support for `dotenv run` to share environment variables between build tooling and `@env` imports, including file precedence, safe mode, and Metro restart requirements.

## [4.1.1](https://github.com/dotenvx/react-native-dotenv/compare/v4.1.0...v4.1.1) (2026-07-28)

### Changed

- Log `◇ injected env` once per process so Metro does not spam it on every file when `api.cache(false)`.

## [4.1.0](https://github.com/dotenvx/react-native-dotenv/compare/v4.0.0...v4.1.0) (2026-07-28)

### Added

- print `◇ injected env (N) from .env` (same style as dotenv). Set `quiet: true` to suppress. ([#593](https://github.com/dotenvx/react-native-dotenv/pull/593))

## [4.0.0](https://github.com/dotenvx/react-native-dotenv/compare/v3.4.12...v4.0.0) (2026-07-28)

### Fixed

- BREAKING: `process.env.X` is only inlined when `X` is defined in a `.env` file (plus `NODE_ENV` / `BABEL_ENV` / `envName`). Stops build-tooling leaks into the bundle without hardcoding tool-specific names. Host/CI-only values still work through `@env` imports ([#574](https://github.com/dotenvx/react-native-dotenv/issues/574)). This also fixes Expo Router compatibility — Expo host env vars like `EXPO_ROUTER_*` are no longer inlined and stomped ([#501](https://github.com/dotenvx/react-native-dotenv/issues/501)).

### Removed

- BREAKING: Removed deprecated `whitelist` and `blacklist` options. Use `allowlist` and `blocklist` instead.

## [3.4.12](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.12) (2026-07-23)

- updated readme ([#584](https://github.com/dotenvx/react-native-dotenv/pull/584))
- Update package.json

## [3.4.11](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.11) (2024-02-27)

- Create tea.yaml ([#489](https://github.com/dotenvx/react-native-dotenv/pull/489))
- updated issue template
- added docs updates ([#481](https://github.com/dotenvx/react-native-dotenv/pull/481))

## [3.4.10](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.10) (2024-02-11)

- update dependencies
- fixes circle-ci
- error message if you are using APP_ENV=development or APP_ENV=production
- Expo environment variables are out

## [3.4.9](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.9) (2023-06-18)

- dotenv vault

## [3.4.8](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.8) (2023-02-24)

- cleanup
- make order dotenv-flow
- readme updates + commonjs issue
- revert node prefix-only core modules ([#399](https://github.com/dotenvx/react-native-dotenv/pull/399))

## [3.4.7](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.7) (2023-01-04)

- yarnfile add
- removed engine lock
- minor documentation and package updates ([#398](https://github.com/dotenvx/react-native-dotenv/pull/398))
- removed another silly xo rule
- please use supported npm versions
- revert node prefix-only core modules
- Update README.md
- Eases out of date babel ([#390](https://github.com/dotenvx/react-native-dotenv/pull/390))

## [3.4.6](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.6) (2022-12-07)

- reversing yarn v3 upates

## [3.4.5](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.5) (2022-12-07)

- yarn upgrade to v3

## [3.4.4](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.4) (2022-12-05)

- trying as prod dependency

## [3.4.3](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.3) (2022-12-04)

- yarn lock update
- added updated babel as peer dep
- Config clean ([#373](https://github.com/dotenvx/react-native-dotenv/pull/373))

## [3.4.2](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.2) (2022-11-12)

- cache fixed

## [3.4.1](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.1) (2022-11-03)

- caching fixes finally ([#370](https://github.com/dotenvx/react-native-dotenv/pull/370))
- updated documentation with cache fixes ([#363](https://github.com/dotenvx/react-native-dotenv/pull/363))
- fix config priority issues with safe mode ([#362](https://github.com/dotenvx/react-native-dotenv/pull/362))
- only replace `process.env` variable if value is defined ([#316](https://github.com/dotenvx/react-native-dotenv/pull/316))
- Update readme instructions for TypeScript ([#360](https://github.com/dotenvx/react-native-dotenv/pull/360))
- fixed formatting of CONTRIBUTING.md ([#315](https://github.com/dotenvx/react-native-dotenv/pull/315))

## [3.4.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.4.0) (2022-03-20)

- Version bump.

## [3.3.2](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.3.2) (2022-11-03)

- caching fixes finally ([#370](https://github.com/dotenvx/react-native-dotenv/pull/370))
- updated documentation with cache fixes ([#363](https://github.com/dotenvx/react-native-dotenv/pull/363))
- fix config priority issues with safe mode ([#362](https://github.com/dotenvx/react-native-dotenv/pull/362))
- only replace `process.env` variable if value is defined ([#316](https://github.com/dotenvx/react-native-dotenv/pull/316))
- Update readme instructions for TypeScript ([#360](https://github.com/dotenvx/react-native-dotenv/pull/360))
- fixed formatting of CONTRIBUTING.md ([#315](https://github.com/dotenvx/react-native-dotenv/pull/315))
- gh-75 fixing babel cache issue ([#288](https://github.com/dotenvx/react-native-dotenv/pull/288))
- Update dependency badge ([#292](https://github.com/dotenvx/react-native-dotenv/pull/292))
- Create SECURITY.md ([#268](https://github.com/dotenvx/react-native-dotenv/pull/268))

## [3.3.1](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.3.1) (2021-12-13)

- fixes NODE_ENV getting wiped on safe ([#252](https://github.com/dotenvx/react-native-dotenv/pull/252))

## [3.3.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.3.0) (2021-11-03)

- added experimental feature process env ([#191](https://github.com/dotenvx/react-native-dotenv/pull/191))
- Add envName to allow custom variable to define env ([#220](https://github.com/dotenvx/react-native-dotenv/pull/220))

## [3.2.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.2.0) (2021-08-11)

- add support for multi-env local files ([#211](https://github.com/dotenvx/react-native-dotenv/pull/211))
- changes env priority ([#198](https://github.com/dotenvx/react-native-dotenv/pull/198))

## [3.1.1](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.1.1) (2021-07-12)

- testing lint fix
- added verbosity test

## [3.1.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.1.0) (2021-07-12)

- added verbose + warn to error + node_env priority
- fix dotenv priority ([#194](https://github.com/dotenvx/react-native-dotenv/pull/194))

## [3.0.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v3.0.0) (2021-06-30)

- dotenv flow was not configured properly and has been updated to closer match [dotenv-flow priority](https://www.npmjs.com/package/dotenv-flow#variables-overwritingpriority)

## [2.6.2](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.6.2) (2021-06-25)

- Patch release.

## [2.6.1](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.6.1) (2021-06-25)

- path fixed

## [2.6.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.6.0) (2021-06-25)

- fixed linting
- fixes #170
- Inclusive Terminology ([#183](https://github.com/dotenvx/react-native-dotenv/pull/183))
- Update README.md

## [2.5.5](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.5.5) (2021-04-06)

- pending lib cleanup ([#142](https://github.com/dotenvx/react-native-dotenv/pull/142))

## [2.5.4](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.5.4) (2021-04-06)

- Create actions ([#119](https://github.com/dotenvx/react-native-dotenv/pull/119))
- updated readme ([#117](https://github.com/dotenvx/react-native-dotenv/pull/117))
- adds .env.local ([#116](https://github.com/dotenvx/react-native-dotenv/pull/116))

## [2.5.3](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.5.3) (2021-02-09)

- fix tests

## [2.5.2](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.5.2) (2021-02-09)

- added .env.local
- no undef babel ([#112](https://github.com/dotenvx/react-native-dotenv/pull/112))

## [2.5.1](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.5.1) (2021-01-26)

- no undef babel
- Readme updates ([#111](https://github.com/dotenvx/react-native-dotenv/pull/111))

## [2.5.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.5.0) (2021-01-08)

- There have been issues creating custom environment variable sets for staging / test environments.
- This fixes that. Now you can just add _any_ custom environment variable set you'd like

## [2.4.4](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.4.4) (2021-01-08)

- auto-fix lint
- Add APP_ENV as the most prior variable to use ([#97](https://github.com/dotenvx/react-native-dotenv/pull/97))
- Create FUNDING.yml

## [2.4.3](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.4.3) (2020-12-03)

- Update issue templates ([#98](https://github.com/dotenvx/react-native-dotenv/pull/98))

## [2.4.2](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.4.2) (2020-10-22)

- specifier robustness + doc updates ([#77](https://github.com/dotenvx/react-native-dotenv/pull/77))

## [2.4.1](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.4.1) (2020-09-29)

- specifier robustness + doc updates
- fixes #1 ([#67](https://github.com/dotenvx/react-native-dotenv/pull/67))

## [2.4.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.4.0) (2020-08-31)

- Multi environment tests finally working
- security updates

## [2.3.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.3.0) (2020-08-06)

- v2.3.0
- change default allowUndefined
- Update README.md ([#48](https://github.com/dotenvx/react-native-dotenv/pull/48))

## [2.2.6](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.2.6) (2020-07-31)

- #41 yarn lock updates ([#44](https://github.com/dotenvx/react-native-dotenv/pull/44))
- removes error ([#40](https://github.com/dotenvx/react-native-dotenv/pull/40))

## [2.2.4](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.2.4) (2020-07-30)

- [Security] Bump elliptic from 6.5.2 to 6.5.3 ([#35](https://github.com/dotenvx/react-native-dotenv/pull/35))
- fixes #36 ([#37](https://github.com/dotenvx/react-native-dotenv/pull/37))
- v2.2.2 #23 fix unexpected token issue legacy browsers ([#31](https://github.com/dotenvx/react-native-dotenv/pull/31))
- Add Gitter badge ([#29](https://github.com/dotenvx/react-native-dotenv/pull/29))

## [2.2.1](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.2.1) (2020-07-27)

- version bump ([#28](https://github.com/dotenvx/react-native-dotenv/pull/28))
- Update README to reference the correct plugin name ([#17](https://github.com/dotenvx/react-native-dotenv/pull/17))

## [2.2.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.2.0) (2020-07-08)

- Multi-environment

## [2.1.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.1.0) (2020-05-28)

- v2.1.0
- Fix safe mode throwing when .env doesn’t exist
- Update unused test
- [Security] Bump acorn from 7.1.0 to 7.1.1
- [Security] Bump acorn from 6.4.0 to 6.4.1
- Fix xo error
- [Security] Bump lodash from 4.17.4 to 4.17.15
- Build on nodejs 12 ([#99](https://github.com/dotenvx/react-native-dotenv/pull/99))
- [Security] Bump https-proxy-agent from 2.2.1 to 2.2.4
- Update package.json metadata for npmjs.com ([#57](https://github.com/dotenvx/react-native-dotenv/pull/57))
- [Security] Bump eslint-utils from 1.3.1 to 1.4.2
- [Security] Bump mixin-deep from 1.3.1 to 1.3.2
- [Security] Bump lodash from 4.17.11 to 4.17.14
- [Security] Bump lodash.mergewith from 4.6.1 to 4.6.2
- [Security] Bump handlebars from 4.0.11 to 4.1.0

## [2.0.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v2.0.0) (2018-08-31)

Moving from `v0.x` to `v2.x` changed both the setup and usage of this package. See the [migration guide](https://github.com/goatandsheep/react-native-dotenv/wiki/Migration-Guide) and the [story wiki page](https://github.com/goatandsheep/react-native-dotenv/wiki/Story-of-this-repo).

## [1.4.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v1.4.0) (2018-06-28)

- Release v1.4.0
- Upgrade xo
- Upgrade nyc
- Upgrade dotenv to 5.0.1
- Update xo
- Add missing Misc section
- Update ava
- Update dotenv

## [1.3.1](https://github.com/dotenvx/react-native-dotenv/releases/tag/v1.3.1) (2017-12-29)

- Release v1.3.1
- Add note about babel-loader cache
- Update ava and nyc
- Remove useless babel-runtime

## [1.3.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v1.3.0) (2017-11-06)

- Release v1.3.0
- Allow importing undefined variables
- Remove useless module transform in tests
- Remove old mocha xo override

## [1.2.2](https://github.com/dotenvx/react-native-dotenv/releases/tag/v1.2.2) (2017-11-05)

- Release v1.2.2
- Remove spread operator to support node 6

## [1.2.1](https://github.com/dotenvx/react-native-dotenv/releases/tag/v1.2.1) (2017-11-05)

- Release v1.2.1
- Add whitelist example
- Use ava for tests
- Update description and example
- Add editorconfig
- Improve code style
- Create LICENSE

## [1.2.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v1.2.0) (2017-11-05)

- Release v1.2.0
- Change env code block style in readme
- Add safe mode to prevent environment access
- Stop parsing .env everytime we meet an import statement
- Add from-env test

## [1.1.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v1.1.0) (2017-11-05)

- Release v1.1.0
- Upgrade nyc
- Allow black/whitelisting env variables

## [1.0.0](https://github.com/dotenvx/react-native-dotenv/releases/tag/v1.0.0) (2017-10-26)

- Initial release.

## Older / prereleases

- `v2.0.0-beta.1` / `v2.0.0-beta.2` — early v2 betas
