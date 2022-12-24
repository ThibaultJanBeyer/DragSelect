# DragSelect Developers Guide

## Collaborate

Since I’ve not so much free time, contributions are very welcome.  
Please follow this [tutorial on collaborating via github](https://www.youtube.com/watch?time_continue=4&v=81uKcXZoQ2A).  
Thanks in advance!

## Prerequisite

We use `yarn` as package manager. Make sure [to install yarn](https://classic.yarnpkg.com/lang/en/docs/install/).

## Setup

The project is kept as simple as possible, so it is very easy to set up.  
Actually, you don’t need to do anything. You will find all work files under `./DragSelect/src/`.  
I.e. `./DragSelect/src/DragSelect.js`. Don’t touch the files in `dist/`. They are automatically generated.

### First time setup

Run:

```
yarn initial
```

It will install dependencies.

### Starting

After the setup, just run

```
yarn start
```

It will run the dev mode (& on osx open `./DragSelect/tests/quicktest.html` for your convenience).  

*Note: opening quicktest will fail on other operating systems than Mac because I’m using the mac specific `open` command to open the file. However, that is not an issue and you can go on opening the file manually.*

Now whenever you make a change to the files in `./DragSelect/src/` they will be transpiled and updated in `./DragSelect/dist/` automatically. All test files including the quicktest use the dist files.


## Testing

### Manual
- You will want to see if your changes work, use `./DragSelect/tests/quicktest.html`. Modify that file as much as you want to match your test cases. Don’t commit any changes to that file.  

### Automated

Just run:

```
yarn test
```

For the testing puppeteer and jest is used. Puppeteer will be installed locally, but can be a bit heavy (~200mb) you can use the [Environment Variables](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables) if you have puppeteer installed already.

- If you feel like your test case should be permanently tested before each release, please add it to the `__tests__` folder.  

## NOTES

- Deployments to npm are made directly in the `./DragSelect` folder by the project owner. You don’t need to care about those.
- Be extra careful with changes that affect the customer facing apis:
- - i.e. when changing/updating/removing topics (publish/subscribe). As these could be used
