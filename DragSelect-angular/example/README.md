# @dragselect/angular example

A real Angular app (strict templates, zoneless) that uses `@dragselect/angular` the way a consumer would: the library is installed from its packed `dist`, and `dragselect` from the local `DragSelect/` build. Playwright drives it in Chromium.

The same tests also run against `../example-ng19`: the same app code (copied over by its `sync-app` script) on Angular 19 with zone.js, the oldest setup we support.

```bash
npm install
npm --prefix ../example-ng19 install   # once
npx playwright install chromium        # once
npm test        # rebuilds DragSelect and @dragselect/angular, reinstalls them, builds the app, runs the browser tests
npm start       # http://localhost:4200, to try it by hand
```

After changing the library, `npm run lib` rebuilds and reinstalls it (`npm start` does not pick up changes on its own). `npm run verify` skips the rebuild; `yarn release:wrappers` uses it.
