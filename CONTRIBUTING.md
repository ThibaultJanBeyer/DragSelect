# DragSelect Developers Guide

## Collaborate

Since I’ve not so much free time, contributions are very welcome.  
Please follow this [tutorial on collaborating via github](https://www.youtube.com/watch?time_continue=4&v=81uKcXZoQ2A).  
Thanks in advance!


## Setup

The project is kept as simple as possible, so it is very easy to set up.  
Actually, you don’t need to do anything. You will find all work files under `src/`.  
Regarding DragSelect, you should work on file `src/DragSelect.js`.
Don’t touch the files in `dist/`. They are automatically generated.

For your ease of mind, you can run:

```
npm start
```

it will install `gulp` for later building & open `tests/quicktest.html` for your convenience.  

*Note: opening quicktest will fail on other operating systems than Mac because I’m using the mac specific `open` command to open the file. However, that is not an issue and you can go on opening the file manually.*


## Testing

For the testing puppeteer and jest is used. Puppeteer will be installed locally, but can be a bit heavy (~200mb) you can use the [Environment Variables](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables) if you have puppeteer installed already.

If you have not jest installed globally yet, install it:
```
npm i -g jest
```

Now you can run the tests:

```
npm run test
```
