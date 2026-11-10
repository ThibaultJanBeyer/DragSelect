
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

## @dragselect/react

The React package lives in [`../DragSelect-react`](../DragSelect-react) and is published as [`@dragselect/react`](https://www.npmjs.com/package/@dragselect/react). Its version always matches `dragselect`: release both together, after `dragselect` is published.

- In `DragSelect-react/package.json`, set the `dragselect` peer and dev dependency to `^` the new version.
- Add the version to `DragSelect-react/CHANGELOG.md` (a "no changes, version bump" line is fine).

```
cd DragSelect-react/
yarn build
npm version $(node -p "require('../DragSelect/package.json').version") --no-workspaces-update
yarn typecheck
yarn test
yarn build
```
- `npm version` here sets the same version as `DragSelect/package.json`.
- Update `"@dragselect/react"` in `www/package.json` to the same version. The docs site links the local workspace package only while the versions match; otherwise Yarn fetches it from npm.
- Run `yarn` at the repo root so `yarn.lock` is up to date, commit, push, then publish:
```
npm publish
```
- `publishConfig.access` is already `public`, which scoped packages need.
- First release only: the `@dragselect` scope has to exist as an npm organization owned by you (https://www.npmjs.com/org/create).

## www

Make sure that www pins the latest react version.