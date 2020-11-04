#!/bin/sh

# Transpile
babel ./src/DragSelect.js -o ./docs/DragSelect.js

# ES6 Module Version
cp ./docs/DragSelect.js ./docs/DragSelect.es6m.js
cat ./bin/es6m.js >> ./docs/DragSelect.es6m.js


# Uglify / Minify
npm run uglify -- ./docs/DragSelect.js -o ./docs/ds.min.js

# ES6 Module Version
cp ./docs/ds.min.js ./docs/ds.es6m.min.js
cat ./bin/es6m.js >> ./docs/ds.es6m.min.js


# Copy All to Dist Folder
cp ./docs/*.js ./dist
