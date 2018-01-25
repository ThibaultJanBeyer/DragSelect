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

*Note: this will fail on other operating systems than Mac because I’m using the mac specific `open` command to open the file*

## Testing

You will want to see if your changes work, use `tests/quicktest.html`. Modify that file as much as you want to match your test cases.  
If you feel like your test case should be permanently tested before each release, just extract it to a new file in the `tests` folder. 
Write what to test & name it `test#.html` where `#` is the next available number.

Once you are happy with your changes, **always test all test scenarios in `tests/`**. I.e. `tests/test1.html`,  `tests/test2.html` etc.  
Unfortunately, this has to be done manually at the moment.  
