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
2. bump version in .js file
3. run `npm run build`
4. you can deploy a new version by pushing to github

Since it uses the `docs/` folder for hosting on `github pages`.
If this was successful, the next step is to publish the new version on `npm`:

```
npm version patch
npm publish
```

versions are either `patch` wich changes 0.0.x, `minor` wich changes 0.x.0 or `major` for x.0.0.  
See [npm docs](https://docs.npmjs.com/getting-started/publishing-npm-packages)  

After that push again, just to make sure
