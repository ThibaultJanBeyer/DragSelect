
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

The React package lives in [`../DragSelect-react`](../DragSelect-react) and is published separately as [`@dragselect/react`](https://www.npmjs.com/package/@dragselect/react).

- If the release depends on new DragSelect features, publish `dragselect` first (see above) and raise the `dragselect` peer range in `DragSelect-react/package.json`.
- Check that `DragSelect-react/CHANGELOG.md` reflects the new version.

```
cd DragSelect-react/
yarn typecheck
yarn test
npm version patch
yarn build
```
- Run from this subfolder, `npm version` only bumps `package.json`: it creates no commit or tag since `.git` is at the repo root.
- Update `"@dragselect/react"` in `www/package.json` to the new version. The docs site links the local workspace package only while the versions match; otherwise Yarn fetches it from npm.
- Run `yarn` at the repo root so `yarn.lock` is up to date, commit, push, then publish:
```
npm publish
```
- `publishConfig.access` is already `public`, which scoped packages need.
- First release only: the `@dragselect` scope has to exist as an npm organization owned by you (https://www.npmjs.com/org/create).
