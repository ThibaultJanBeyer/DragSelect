# Getting Started

> Install DragSelect and select your first elements in two minutes.

DragSelect is a small but professional, cross platform library with no dependencies that adds a selection mechanism similar to your operating system to the browser. It allows you to select multiple elements and drag and drop them around.

Let's discover how to use **DragSelect in less than 2 minutes**. You don’t believe me? It’s very easy, you’ll see!

## 🧩 Installation (Install it)

You can download the binary files and add them to your document.
Or better use a Content Delivery Network (CDN).
Or even better install it via a package manager like NPM:

**NPM**

```
npm i -S dragselect
```

**Yarn**

```
yarn add dragselect
```

**Download**

- [DragSelect](https://dragselect.com/DragSelect.js) ([minified](https://dragselect.com/ds.min.js))
- [DragSelect ES6 Module](https://dragselect.com/DragSelect.esm.js) ([minified](https://dragselect.com/ds.esm.min.js))
- From our website:

```html
<script src="https://dragselect.com/ds.min.js"></script>
```

> We don't recommend the direct linking for production set-up. Please use `npm` if you can.

**CDN**

**Modules**

```html
<script
  type="module"
  src="https://unpkg.com/dragselect@latest/dist/DragSelect.esm.js"
></script>
```

Or Minified:

```html
<script
  type="module"
  src="https://unpkg.com/dragselect@latest/dist/ds.esm.min.js"
></script>
```

**Traditional**

```html
<script src="https://unpkg.com/dragselect@latest/dist/DragSelect.js"></script>
```

Or Minified:

```html
<script src="https://unpkg.com/dragselect@latest/dist/ds.min.js"></script>
```

> Using React or Angular? There are official bindings: see the [React](/docs/guided-examples/React) and [Angular](/docs/guided-examples/Angular) guides.

## 🎸 That's it, you're ready to rock! (Use it)

DragSelect supports `module.exports`, `AMD Modules` with `define`, `es6 modules` with `.esm` versions and has a fallback to global namespace for maximum out of the box support:

**ES6**

```js
import DragSelect from "dragselect";

const ds = new DragSelect({
  selectables: document.querySelectorAll(".selectable"),
});

ds.subscribe("DS:end", (e) => {
  console.log(e);
});
```

**CommonJS**

```js
const DragSelect = require("dragselect");

const ds = new DragSelect({
  selectables: document.querySelectorAll(".selectable"),
});

ds.subscribe("DS:end", (e) => {
  console.log(e);
});
```

**AMD**

```js
require(["dragselect"], function (DragSelect) {
  const ds = new DragSelect({
    selectables: document.querySelectorAll(".selectable"),
  });

  ds.subscribe("DS:end", (e) => {
    console.log(e);
  });
});
```

**Global**

```js
const ds = new DragSelect({
  selectables: document.querySelectorAll(".selectable"),
});

ds.subscribe("DS:end", (e) => {
  console.log(e);
});
```

**From CDN**

```js
import DragSelect from "https://unpkg.com/dragselect@latest/dist/ds.esm.min.js";

const ds = new DragSelect({
  selectables: document.querySelectorAll(".selectable"),
});

ds.subscribe("DS:end", (e) => {
  console.log(e);
});
```

## 🎬 Aaaand action! (See it)

<iframe
  height="400"
  style={{ width: "100%" }}
  scrolling="no"
  title="DragSelect"
  src="https://codepen.io/ThibaultJanBeyer/embed/prpwYG?default-tab=result&editable=true&theme-id=dark"
  frameBorder="no"
  loading="lazy"
  allowtransparency="true"
  allowFullScreen />

[Open this example on CodePen](https://codepen.io/ThibaultJanBeyer/pen/prpwYG)

_Pssst: try using your keyboard only or selecting multiple elements with Shift. It just works ;-)_

### Within a scroll-able Area

<iframe
  height="400"
  style={{ width: "100%" }}
  scrolling="no"
  title="DragSelect with Scrollable AREA"
  src="https://codepen.io/ThibaultJanBeyer/embed/Nvobgq?default-tab=result&editable=true&theme-id=dark"
  frameBorder="no"
  loading="lazy"
  allowtransparency="true"
  allowFullScreen />

[Open this example on CodePen](https://codepen.io/ThibaultJanBeyer/pen/Nvobgq)

### With DropZones

<iframe
  height="400"
  style={{ width: "100%" }}
  scrolling="no"
  title="DragSelect with Scrollable AREA"
  src="https://codepen.io/ThibaultJanBeyer/embed/bGKgVxp?default-tab=result&editable=true&theme-id=dark"
  frameBorder="no"
  loading="lazy"
  allowtransparency="true"
  allowFullScreen />

[Open this example on CodePen](https://codepen.io/ThibaultJanBeyer/pen/bGKgVxp)

## 📚 What next?

Most importantly:

    If you like what you see, make sure to{" "}

      Star
    {" "}
    DragSelect

Tell all your friends/colleagues.

    If you think it is worth continuing developing & maintaining DragSelect,
    please{" "}

      Sponsor
    {" "}
    or{" "}

      contribute

    !

    If your project makes money:{" "}
    Purchase a commercial license.

> Creating and maintaining useful tools is a lot of work. Thank you :-)

### Learn

This page is just a very brief introduction showcasing a limited set of the many features.
DragSelect is ultra extensible and feature rich!
Make sure to read the guides and the documentation. If you’re stuck feel free to [reach out on Github](https://github.com/ThibaultJanBeyer/DragSelect).

- [API](/docs/category/api)
- [Guided Examples](/docs/category/guided-examples)

[![Typewriter Gif](/img/typewriter.gif)](https://thibaultjanbeyer.com/)
