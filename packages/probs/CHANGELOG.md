# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/jakobrosenberg/bestest/compare/v1.1.0...v1.2.0) (2022-11-21)


### Features

* optional options as test's 2nd param ([c3580d6](https://github.com/jakobrosenberg/bestest/commit/c3580d6b101ebf43cff8338a79a998dda9838217))


### Bug Fixes

* skipped tests weren't showing ([b6ab87c](https://github.com/jakobrosenberg/bestest/commit/b6ab87c4ba2df79cf80ff4522a1d60131fef06d0))

## [1.1.0](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-20...v1.1.0) (2022-09-02)


### Features

* added recursive options to test callback ([7f06a47](https://github.com/jakobrosenberg/bestest/commit/7f06a47c3d578a889fc7f8a86fe65aee4fff7712))
* added TestCbPayload to onError ([9f8c073](https://github.com/jakobrosenberg/bestest/commit/9f8c073d932a4c3646a5de7604dbac16dfcf9aa3))

## [1.1.0-20](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-19...v1.1.0-20) (2022-08-17)


### Bug Fixes

* relative paths didn't work with globs ([9e8b9d4](https://github.com/jakobrosenberg/bestest/commit/9e8b9d491d7b3a2d728c57e89378fcf163328216))

## [1.1.0-19](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-18...v1.1.0-19) (2022-08-06)


### Features

* added update snapshots shortcut to watcher ([8ca121f](https://github.com/jakobrosenberg/bestest/commit/8ca121fb5e97554185b8777392e7ebddb3bbbb6e))

## [1.1.0-18](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-17...v1.1.0-18) (2022-08-06)


### Features

* update snapshot from cli ([dbdfcab](https://github.com/jakobrosenberg/bestest/commit/dbdfcabe536f7d15eebf69129fc7c234d8505ed9))

## [1.1.0-17](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-16...v1.1.0-17) (2022-06-29)


### Bug Fixes

* snapshots ([2f7566d](https://github.com/jakobrosenberg/bestest/commit/2f7566da1716fb1cbfc50dde63a6005fd02483bd))

## [1.1.0-16](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-15...v1.1.0-16) (2022-05-31)


### Bug Fixes

* restore process.exit(1) for CLI ([a7e397f](https://github.com/jakobrosenberg/bestest/commit/a7e397ffa5b5eca9bd1ae6aca04a8c4e82eebe71))

## [1.1.0-15](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-14...v1.1.0-15) (2022-04-26)


### Bug Fixes

* improve performance on skipped tests ([6cbd8c2](https://github.com/jakobrosenberg/bestest/commit/6cbd8c246a90981bee87a2393f150de8dfb94be5))

## [1.1.0-14](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-12...v1.1.0-14) (2022-04-26)


### Bug Fixes

* watcher improvements ([2c63a80](https://github.com/jakobrosenberg/bestest/commit/2c63a803cee23126d2c27379451cc641bb965faa))
* watcher loop ([88cbcaf](https://github.com/jakobrosenberg/bestest/commit/88cbcafa944aadc0728384d7467d885a65d89480))

## [1.1.0-13](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-12...v1.1.0-13) (2022-04-26)


### Bug Fixes

* watcher improvements ([2c63a80](https://github.com/jakobrosenberg/bestest/commit/2c63a803cee23126d2c27379451cc641bb965faa))

## [1.1.0-12](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-11...v1.1.0-12) (2022-04-25)


### Features

* add watcher ([95dbc0f](https://github.com/jakobrosenberg/bestest/commit/95dbc0f9104c290cdc8ded8e4ccb3c3818707674))
* better test summary ([dccdadf](https://github.com/jakobrosenberg/bestest/commit/dccdadf047a298467f700c6a70da487adfbaa3d7))
* watch-menu ([793b3d7](https://github.com/jakobrosenberg/bestest/commit/793b3d753bad6d833e80fe2346c8c6d621e03cef))


### Bug Fixes

* allow spaces in pattern delimiter ([1fd0340](https://github.com/jakobrosenberg/bestest/commit/1fd03407e471b5f0657a2e9a35a9d1c675a459c8))
* relative paths couldn't be prefixed with ./ ([d47e101](https://github.com/jakobrosenberg/bestest/commit/d47e10104a39d387966a5b9641be4160cdb28274))

## [1.1.0-11](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-10...v1.1.0-11) (2022-04-22)


### Bug Fixes

* bad types ([4c9ba39](https://github.com/jakobrosenberg/bestest/commit/4c9ba397cfd0ef8be07a0923dffdee477a613f1b))

## [1.1.0-10](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-9...v1.1.0-10) (2022-04-22)


### Bug Fixes

* duplicate tests ([69347c9](https://github.com/jakobrosenberg/bestest/commit/69347c92bb8409403dbd46ce385131f940d7014f))
* fix types ([aa4aad1](https://github.com/jakobrosenberg/bestest/commit/aa4aad18cd35d5fd7ff1a057c8db6758d44291de))
* missing timestamps ([aa93498](https://github.com/jakobrosenberg/bestest/commit/aa9349885fd3610cd72fdc34594a2814cbb8bb2c))

## [1.1.0-9](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-8...v1.1.0-9) (2022-04-11)


### Bug Fixes

* timeout didn't log cause of error ([8e17eca](https://github.com/jakobrosenberg/bestest/commit/8e17ecab5e7a8b0d3208c89ec224c817916cf123))

## [1.1.0-8](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-7...v1.1.0-8) (2022-04-11)


### Bug Fixes

* better reporting ([68f36d2](https://github.com/jakobrosenberg/bestest/commit/68f36d2f71bdf221453776c990f3ceacc1115b9f))

## [1.1.0-7](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-6...v1.1.0-7) (2022-04-11)


### Bug Fixes

* errors without toString would break ([dcb43f5](https://github.com/jakobrosenberg/bestest/commit/dcb43f5e34bc752b59c225a6a697443d2b2ea3c6))

## [1.1.0-6](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-5...v1.1.0-6) (2022-04-07)


### Features

* test timeouts ([606d318](https://github.com/jakobrosenberg/bestest/commit/606d318e6370b631657afde8a281c43ad04794dd))

## [1.1.0-5](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-4...v1.1.0-5) (2022-03-30)


### Bug Fixes

* tests required block callbacks ([2417c06](https://github.com/jakobrosenberg/bestest/commit/2417c06351e5eb7531ca53776414c026284d6782))

## [1.1.0-4](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-3...v1.1.0-4) (2022-03-14)


### Bug Fixes

* __snapshots__ should be lowercase ([03f1b78](https://github.com/jakobrosenberg/bestest/commit/03f1b78dabfb79c04083ce4915598025ad8cf5dc))

## [1.1.0-3](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-2...v1.1.0-3) (2022-03-09)


### Features

* provided optional test cb in tests context ([7ef2ee8](https://github.com/jakobrosenberg/bestest/commit/7ef2ee86753fcb70f2cb3a9252617bdba7f9bf60))

## [1.1.0-2](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-1...v1.1.0-2) (2022-03-08)


### Features

* added main runner ([42fdff2](https://github.com/jakobrosenberg/bestest/commit/42fdff2707f02b4139e8375157202d3bc1c3af68))


### Bug Fixes

* defaults missing for non-cli ([15c477f](https://github.com/jakobrosenberg/bestest/commit/15c477f9ecedbdf6d6e8e37efd55502322c7f070))
* probs should return a promise ([1a60e73](https://github.com/jakobrosenberg/bestest/commit/1a60e734f7ed082f4c686fe5b8977bac10566c9c))
* report errors for broken test files ([fea1655](https://github.com/jakobrosenberg/bestest/commit/fea16553988c61d0f1e5892145b4e188f69016b6))

## [1.1.0-1](https://github.com/jakobrosenberg/bestest/compare/v1.1.0-0...v1.1.0-1) (2022-03-07)


### Bug Fixes

* support expect.extend and use .snap extension ([acd1e4b](https://github.com/jakobrosenberg/bestest/commit/acd1e4b27d21a1b0d8e219af16b7d965d507a7aa))

## [1.1.0-0](https://github.com/jakobrosenberg/bestest/compare/v1.0.0-6...v1.1.0-0) (2022-03-06)


### Features

* add concurrency modes for individual tests ([c23a421](https://github.com/jakobrosenberg/bestest/commit/c23a42167a1aec69bbf5fe9b18f12c5bc0ba405a))


### Bug Fixes

* types ([1aafbb3](https://github.com/jakobrosenberg/bestest/commit/1aafbb307abfe7d41e6181d704c01612806da66d))

## [1.0.0](https://github.com/jakobrosenberg/bestest/compare/v1.0.0-6...v1.0.0) (2022-03-06)


### Features

* add concurrency modes for individual tests ([c23a421](https://github.com/jakobrosenberg/bestest/commit/c23a42167a1aec69bbf5fe9b18f12c5bc0ba405a))


### Bug Fixes

* types ([1aafbb3](https://github.com/jakobrosenberg/bestest/commit/1aafbb307abfe7d41e6181d704c01612806da66d))

## [1.0.0-6](https://github.com/jakobrosenberg/bestest/compare/v1.0.0-4...v1.0.0-6) (2022-03-06)


### Features

* support for multiple esm loaders ([f5545fd](https://github.com/jakobrosenberg/bestest/commit/f5545fd9a2d487421415de6cc58756959afdd870))


### Bug Fixes

* make expect global (solves expect.extend) ([c9ffc2a](https://github.com/jakobrosenberg/bestest/commit/c9ffc2ad65a1b5bf6eacf5274970e60e160cb1fa))

## [1.0.0-4](https://github.com/jakobrosenberg/bestest/compare/v1.0.0-3...v1.0.0-4) (2022-03-04)


### Features

* support loaders in --execArgv ([99ab914](https://github.com/jakobrosenberg/bestest/commit/99ab914e5fa8236d562bd7c2702d7268d2f5f21e))


### Bug Fixes

* bad version of esm-chain-loader ([89ac307](https://github.com/jakobrosenberg/bestest/commit/89ac3077ecbc2d434164e61ff5bac2aba5b142a4))
* esmoduleinterop for expect ([53e67b3](https://github.com/jakobrosenberg/bestest/commit/53e67b322a907a060c04bf90dc45a2bc9463ac9b))

## [1.0.0-3](https://github.com/jakobrosenberg/bestest/compare/v1.0.0-2...v1.0.0-3) (2022-02-07)


### Bug Fixes

* didn't catch .mjs files by default ([cf7e3a7](https://github.com/jakobrosenberg/bestest/commit/cf7e3a7c501866760ca5f85050b90ad6dcd9dd18))

## [1.0.0-2](https://github.com/jakobrosenberg/bestest/compare/v1.0.0-0...v1.0.0-2) (2022-02-07)


### Bug Fixes

* loader didn't work ([eb67c5f](https://github.com/jakobrosenberg/bestest/commit/eb67c5fc48f1bae44d54fe1731b27c8fee3fb61c))

## [1.0.0-1](https://github.com/jakobrosenberg/bestest/compare/v1.0.0-0...v1.0.0-1) (2022-02-07)


### Bug Fixes

* loader didn't work ([eb67c5f](https://github.com/jakobrosenberg/bestest/commit/eb67c5fc48f1bae44d54fe1731b27c8fee3fb61c))

## [1.0.0-0](https://github.com/jakobrosenberg/bestest/compare/v0.2.0...v1.0.0-0) (2022-02-06)

## [0.2.0](https://github.com/jakobrosenberg/bestest/compare/v0.1.7...v0.2.0) (2022-02-06)


### ⚠ BREAKING CHANGES

* test arg in nested tests no longer needed

### Features

* added fork runner ([b596d06](https://github.com/jakobrosenberg/bestest/commit/b596d06e23d7d383b8b1355b8bddb3df4386cbc5))
* added jest-diff ([0ba60c2](https://github.com/jakobrosenberg/bestest/commit/0ba60c2ceacae40deab823670a38b11e80647695))
* nested tests are automatically detected ([3d76551](https://github.com/jakobrosenberg/bestest/commit/3d76551ba71bdfdd71478cf56b218043cf48dfea))
* test arg in nested tests no longer needed ([faa5ba2](https://github.com/jakobrosenberg/bestest/commit/faa5ba2370855675e0da60aacc0cee673f899923))


### Bug Fixes

* double report for closed file ([381c026](https://github.com/jakobrosenberg/bestest/commit/381c02670c85451187ee4434d637bf6dcffbb325))
* types ([dc31774](https://github.com/jakobrosenberg/bestest/commit/dc3177443a8a67ba60f040c33999e65948b7e0e6))
* undefined should be unresolved ([db33367](https://github.com/jakobrosenberg/bestest/commit/db33367ddd913d49ee0840bf417c80dd21469dd2))
* use specificity for options ([978a0f6](https://github.com/jakobrosenberg/bestest/commit/978a0f6b4dbcba4c64df24a3131ac0e93d669f74))
* workers: 0 didn't report tests ([97e94a0](https://github.com/jakobrosenberg/bestest/commit/97e94a059b1eaa81ba8c0605f54b43e9bdacb16a))

### [0.1.7](https://github.com/jakobrosenberg/bestest/compare/v0.1.6...v0.1.7) (2022-01-24)


### Bug Fixes

* better errors ([58a0f45](https://github.com/jakobrosenberg/bestest/commit/58a0f451a5649b5a4d0dde47a6de1adfedb9e9d3))
* setupDir ran on each subfolder ([581abed](https://github.com/jakobrosenberg/bestest/commit/581abede2ba360413964973fdd4eb323e8ea85a3))

### [0.1.6](https://github.com/jakobrosenberg/bestest/compare/v0.1.5...v0.1.6) (2021-12-11)


### Features

* added teardownFile ([570e6d0](https://github.com/jakobrosenberg/bestest/commit/570e6d0d6ae113fdd331b0457936eb9f2715baa5))
* setupDir ([6cc8c41](https://github.com/jakobrosenberg/bestest/commit/6cc8c412a59ab8a72d606560493de674607f561c))


### Bug Fixes

* added *.spec.js to default glob ([fd3c57c](https://github.com/jakobrosenberg/bestest/commit/fd3c57ca60ded06f079f1418dab8531bf06b226c))

### [0.1.5](https://github.com/jakobrosenberg/bestest/compare/v0.1.4...v0.1.5) (2021-12-09)


### Bug Fixes

* setupFile should be async ([eed0a69](https://github.com/jakobrosenberg/bestest/commit/eed0a69920f7a3479581c6925a4c227271672380))

### [0.1.4](https://github.com/jakobrosenberg/bestest/compare/v0.1.3...v0.1.4) (2021-12-08)


### Bug Fixes

* updated types ([7e79004](https://github.com/jakobrosenberg/bestest/commit/7e790049c70bd6869bdffc215d221300b2421eef))

### [0.1.3](https://github.com/jakobrosenberg/bestest/compare/v0.1.2...v0.1.3) (2021-12-01)


### Features

* allow worker to be configured ([4030075](https://github.com/jakobrosenberg/bestest/commit/403007552210dde78d00fa96b12464ce14777dce))

### [0.1.2](https://github.com/jakobrosenberg/bestest/compare/v0.1.1...v0.1.2) (2021-11-26)


### Features

* added types ([b4bb953](https://github.com/jakobrosenberg/bestest/commit/b4bb953eb27357e160d87395ef019ad72ebb5c4e))

### [0.1.1](https://github.com/jakobrosenberg/bestest/compare/v0.1.0...v0.1.1) (2021-11-23)


### Bug Fixes

* hookar was missing ([9156ba2](https://github.com/jakobrosenberg/bestest/commit/9156ba2cc9c9b97ddb6767e5ac3e1d35ecf75316))

## [0.1.0](https://github.com/jakobrosenberg/bestest/compare/v0.0.2...v0.1.0) (2021-11-23)


### ⚠ BREAKING CHANGES

* replaced queued test with added test

### Features

* added --ignore ([1f2c409](https://github.com/jakobrosenberg/bestest/commit/1f2c409a3ddd0112e982704bdc298751907846af))
* added before/after Each/All hooks ([5a99265](https://github.com/jakobrosenberg/bestest/commit/5a99265847ab86301959c3b2237dc0b02d19b659))
* added it and describe aliases ([18a84fb](https://github.com/jakobrosenberg/bestest/commit/18a84fbd35e74eb0e9f1379a17a54cdd855a4207))
* added jsonReporter ([f33830f](https://github.com/jakobrosenberg/bestest/commit/f33830fad7012aca85e2b6f3887fa09939738396))
* added scoped configs ([28a4557](https://github.com/jakobrosenberg/bestest/commit/28a45573ed29ec5370e45998092ce8393257defa))
* state helper and improved output ([08915fd](https://github.com/jakobrosenberg/bestest/commit/08915fd526fd7c8b72ecb62c42533cf481dda37d))


### Bug Fixes

* better parsing of worker number ([8103e35](https://github.com/jakobrosenberg/bestest/commit/8103e3525c55492c00e5565c5c4803dd5771ac55))
* console reporter false partial match ([c0c043b](https://github.com/jakobrosenberg/bestest/commit/c0c043be3df060a9a1a9709f4f89e3a0c166e073))
* context callback could break probs ([1e0d5ee](https://github.com/jakobrosenberg/bestest/commit/1e0d5ee28e5df4869fd8d632b064788ab4ad6ae2))
* files without tests would throw error ([b0c1fc8](https://github.com/jakobrosenberg/bestest/commit/b0c1fc813035b1776c42be7d8057c0c22486afd9))
* improvements & bug fixes for test runner ([67d3be7](https://github.com/jakobrosenberg/bestest/commit/67d3be78e82df1c712d660c90a011777ed0db92b))
* lots of fixes and refactors ([92edef7](https://github.com/jakobrosenberg/bestest/commit/92edef74b2cf3d4bd9e6a7bb83fa183597d0a442))
* missing json reporter export ([93ed2db](https://github.com/jakobrosenberg/bestest/commit/93ed2dbcd9fa5ce746ae0d5bb50c19e3e45811ac))
* reporter would throw error on missing hook ([d41caef](https://github.com/jakobrosenberg/bestest/commit/d41caef1b9ea33e2ab2669aeb41ff636edd0ae7c))
* state manager wasn't stringable ([7bff303](https://github.com/jakobrosenberg/bestest/commit/7bff303ba4a8dcaaba368671eb60d922b898cd96))
* wrong path should throw error ([359ad61](https://github.com/jakobrosenberg/bestest/commit/359ad61437172c62fba4a21b80165821f45ddcbe))


* replaced queued test with added test ([cfd2428](https://github.com/jakobrosenberg/bestest/commit/cfd24286dd28dbee663e7634b81857132a7a352a))

### [0.0.2](https://github.com/jakobrosenberg/bestest/compare/v0.0.1...v0.0.2) (2021-10-30)


### Bug Fixes

* cli ([5b9dcb2](https://github.com/jakobrosenberg/bestest/commit/5b9dcb2ebb23213eb0fc9f461b43ec422a29fea9))

### 0.0.1 (2021-10-30)


### Features

* added assert to globals ([dcf52bf](https://github.com/jakobrosenberg/bestest/commit/dcf52bf852f64e378bb6131b8de4757b5d3ba776))
* added pattern matching ([ffb2b12](https://github.com/jakobrosenberg/bestest/commit/ffb2b12247897d7dfd099c842b252ee39a22cc13))
* added reporters and workers options ([c586747](https://github.com/jakobrosenberg/bestest/commit/c586747ae97aba2fe9566fa83c1663800457b4b0))
* added types ([67b17bb](https://github.com/jakobrosenberg/bestest/commit/67b17bb00aee352d27c694e4fe2f8e8f54708b57))
* make globals optional ([56df3f1](https://github.com/jakobrosenberg/bestest/commit/56df3f1a9e794de40096e0bcd59bc060359b121a))


### Bug Fixes

* consolereporter didn't catch errors ([1625e3e](https://github.com/jakobrosenberg/bestest/commit/1625e3e0c2b833f2aabc8ba5383f2d266a75bc88))
* didn't travel recursively ([8837b1d](https://github.com/jakobrosenberg/bestest/commit/8837b1d951adcf52c3699299fe83a19d4321bbea))
* reporter ([82bc2de](https://github.com/jakobrosenberg/bestest/commit/82bc2de1492a4653047d10f1740da6a524bb69a7))
