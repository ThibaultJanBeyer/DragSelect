# DragSelect Developers Guide

## Collaborate

Since I’ve not so much free time, contributions are very welcome.  
Please follow this [tutorial on collaborating via github](https://www.youtube.com/watch?time_continue=4&v=81uKcXZoQ2A).  
Thanks in advance!


## Setup

The project is kept as simple as possible, so it is very easy to set up.  
Actually, you don’t need to do anything. You will find all work files under `src/`.  
I.e. `src/DragSelect.js`. Don’t touch the files in `docs/` nor in `dist/`. They are automatically generated.

Run:

```
npm start
```

it will install dependencies & run the dev mode (& on osx open `tests/quicktest.html` for your convenience).  

*Note: opening quicktest will fail on other operating systems than Mac because I’m using the mac specific `open` command to open the file. However, that is not an issue and you can go on opening the file manually.*

Now whenever you make a change to the `DragSelect.js` in `src/` it will be transpiled and updated in `docs/` and `dist/` automatically. This is important since clients use those files.


## Testing

- You will want to see if your changes work, use `tests/quicktest.html`. Modify that file as much as you want to match your test cases.  

### Automatic

For the testing playwright is used.

Automated tests are run via:

```
npm test
```

- Please add your test case it to the `__tests__` folder.  

## NOTES

- Be extra careful with changes that affect the customer facing apis:
- - when changing/updating/removing topics (publish/subscribe). As these could be used
