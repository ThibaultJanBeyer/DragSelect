
# Don‘t do this if you are not project owner!

This information is just for reference for the project owner,
if you are a regular contributor, see [contibuting](../CONTRIBUTING.md) and make a pull request instead.

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
- versions are either `patch` wich changes 0.0.x, `minor` wich changes 0.x.0 or `major` for x.0.0.  
  See [npm docs](https://docs.npmjs.com/getting-started/publishing-npm-packages)  

- After that push again, just to make sure and then publish:
```
npm publish
```
