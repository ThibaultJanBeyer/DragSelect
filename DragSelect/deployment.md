
# Don‘t do this if you are not project owner!

This information is just for reference for the project owner,
if you are a regular contributor, see [contributing](../CONTRIBUTING.md) and make a pull request instead.

-
-
-
-


If tests were successful, the next step is to publish the new version on `npm`:

- Check if the `changelog` reflects the latest version
- `cd DragSelect/` if not already

```
yarn build
yarn test
```
- Build is necessary for npm packages (since `dist` will be deployed to npm but is ignored in repo)

```
npm version patch
yarn build
```
- versions are either `patch` which changes 0.0.x, `minor` which changes 0.x.0 or `major` for x.0.0.  
  See [npm docs](https://docs.npmjs.com/getting-started/publishing-npm-packages)  

- After that push again, just to make sure and then publish:
```
npm publish
```

## @dragselect/react & @dragselect/angular

Match `dragselect` version, release together, after `dragselect` is published.

- Add the new version to `DragSelect-react/CHANGELOG.md` and `DragSelect-angular/CHANGELOG.md` (a "no changes, version bump" line is fine).
- From the repo root:

```
yarn release:wrappers
```

- This sets both wrappers' `version` and their `dragselect` peer/dev dependency to the `dragselect` version, updates `"@dragselect/react"` in `www/package.json` (the docs site links the local workspace package only while the versions match; otherwise Yarn fetches it from npm), runs `yarn` so `yarn.lock` is up to date, then typechecks, tests and builds both wrappers, and runs the browser tests of the Angular example app (`DragSelect-angular/example`) against the built packages. Build `dragselect` first: the example installs it from `DragSelect/`. It warns if a changelog has no entry for the version.
- Commit, push, then publish:

```
yarn publish:wrappers
```

- React publishes its package folder. Angular publishes `dist`, because ng-packagr writes the publishable `package.json` there.
- `publishConfig.access` is already `public` for both, which scoped packages need.

## www

Make sure that www pins the latest react version.

## All Together

```
# 1. core
cd DragSelect
yarn build && yarn test
npm version minor   # → 3.2.0, includes the changelog edit if you commit it first
yarn build
git push --follow-tags
npm publish
cd ..

# 2. wrappers: syncs versions/peer deps to 3.2.0, runs yarn, tests, builds, and the Angular browser tests
yarn release:wrappers
git add -A && git commit -m "release wrappers 3.2.0" && git push
yarn publish:wrappers
```
