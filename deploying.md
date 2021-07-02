# Don‘t do this if you are not project owner!

This information is just for reference for the project owner,
if you are a regular contributor, see [contibuting](CONTRIBUTING.md) and make a pull request instead.

-
-
-
-
-

## Deploying

Tipically you don’t have to do this, since you most likely are not the project owner.  
But if you are the project owner:

1. do thorough testing
2. `npm run rollup`
3. Travis will take care of deployment to gh-pages when you push/merge to github (gh-pages will be build by travis)

If this was successful, the next step is to publish the new version on `npm`:

```
npm version patch
npm run rollup
npm publish
```

versions are either `patch` wich changes 0.0.x, `minor` wich changes 0.x.0 or `major` for x.0.0.  
See [npm docs](https://docs.npmjs.com/getting-started/publishing-npm-packages)  

After that push again, just to make sure
