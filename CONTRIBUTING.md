# DragSelect Developers Guide

## Collaborate

Since I’ve not so much free time, contributions are very welcome.  
Please follow this [tutorial on collaborating via github](https://www.youtube.com/watch?time_continue=4&v=81uKcXZoQ2A).  
Thanks in advance!


## Setup

The project is kept as simple as possible, so it is very easy to set up.  
Actually, you don’t need to do anything. You will find all work files under `src/`.  
Regarding DragSelect, you should work on file `src/DragSelect.js`.
Don’t touch the files in `docs/`. They are automatically generated.

For your ease of mind, you can run:

```
npm start
```

it will install dependencies & run the dev mode (& on osx open `tests/quicktest.html` for your convenience).  

*Note: opening quicktest will fail on other operating systems than Mac because I’m using the mac specific `open` command to open the file. However, that is not an issue and you can go on opening the file manually.*

Now whenever you make a change to the `DragSelect.js` in `src/` it will be transpiled and updated in `docs/` automatically. This is important since all test files use the `docs/` version.


## Testing

- You will want to see if your changes work, use `tests/quicktest.html`. Modify that file as much as you want to match your test cases.  

### Automatic

For the testing puppeteer and jest is used. Puppeteer will be installed locally, but can be a bit heavy (~200mb) you can use the [Environment Variables](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables) if you have puppeteer installed already.

Automated tests are run via:

```
npm test
```

- If you feel like your test case should be permanently tested before each release, please add it to the `__tests__` folder.  
