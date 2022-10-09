# Don‘t do this if you are not project owner!

This information is just for reference for the project owner,
if you are a regular contributor, see [contibuting](CONTRIBUTING.md) and make a pull request instead.

-
-
-
-
-

## Deploying

Typically you don’t have to do this, since you most likely are not the project owner.  
But if you are the project owner:

- Travis will take care of deployment to gh-pages when you push/merge to github (gh-pages will be build by Travis)

If this was successful, the next step is to publish the new version on `npm`:

```
npm version patch
npm run rollup
```
Rollup is necessary for npm packages (since `dist` will be deployed to npm but is ignored in repo)

versions are either `patch` wich changes 0.0.x, `minor` wich changes 0.x.0 or `major` for x.0.0.  
See [npm docs](https://docs.npmjs.com/getting-started/publishing-npm-packages)  

Check if the `changelog` reflects the latest version

After that push again, just to make sure and then publish

```
npm publish
```
