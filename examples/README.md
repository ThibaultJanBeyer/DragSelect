# DS-Test: post-release checks

Three small apps that install **the published packages from NPM**, the way a user would:

- `js-test/`: vanilla JS + Vite, uses `dragselect`
- `react-test/`: React 19 + Vite, uses `@dragselect/react`
- `angular-test/`: Angular 22 + Angular CLI (AOT, zoneless), uses `@dragselect/angular`

Run them after every release, both by hand and with the automated browser tests.

## Automated (Playwright)

```bash
npm install
npx playwright install        # first time only: downloads Chromium, Firefox, WebKit
npm run test:latest           # installs dragselect@latest + @dragselect/react@latest + @dragselect/angular@latest, then runs the tests
```

The run starts by printing the package versions under test. Each app gets a production build (`vite build`, or `ng build` for Angular) and is served with `vite preview`. The specs in `e2e/` then run against it in Chromium, Firefox and WebKit.

Other scripts:

| script | what it does |
| --- | --- |
| `npm test` | run against whatever is currently installed (no reinstall) |
| `npm run test:headed` | same, with visible browser windows |
| `npm run test:ui` | Playwright UI mode, for stepping through tests |
| `npm run report` | open the HTML report of the last run (traces + screenshots of failures) |
| `npm run install:latest` | only update all apps to the latest published versions |

Run a single app or browser with `npx playwright test --project=react-chromium`. The projects are `{js,react,angular}-{chromium,firefox,webkit}`.

### What is covered

All apps:

- initializes exactly once (in React, a StrictMode double-mount leaves one instance)
- click to select; Shift/Ctrl+click adds and toggles
- lasso (rubber-band) selection
- "Select all" / "Clear" through the public API
- dragging a selection moves every selected item and leaves the others in place
- dropping on a drop zone reports the right target (in React and Angular, the drop updates state)
- no errors in the browser console

js-test also covers Shift+lasso extending the selection and dragging an unselected item.

## Manual

```bash
cd js-test && npm run dev      # or react-test, angular-test
```
