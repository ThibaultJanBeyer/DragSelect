<p align="center" style="text-align: center" >
  <a href="https://DragSelect.com/">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="https://dragselect.com/img/dragselect-logo.png">
      <source media="(prefers-color-scheme: dark)" srcset="https://dragselect.com/img/dragselect-logo-alt.png">
      <img alt="The DragSelect logo: a selection symbol, a hand, a drop symbol and a mouse within a selection square." width="300" src="https://dragselect.com/img/dragselect-logo.png">
    </picture>
  </a>
</p>
<p align="center" style="text-align: center">
  <a href="https://dragselect.com/">Project-Page</a> |
  <a href="https://dragselect.com/docs/intro">Documentation</a> |
  <a href="https://github.com/ThibaultJanBeyer/DragSelect/">Github</a> | 
  <a href="https://www.npmjs.com/package/dragselect">NPM</a> | 
  <a href="https://dragselect.com/licenses">Licenses</a>
</p>
<p align="center" style="text-align: center; margin-bottom: 50px;">
<a href="https://github.com/ThibaultJanBeyer/DragSelect/actions"><img alt="Build Status" src="https://github.com/ThibaultJanBeyer/DragSelect/actions/workflows/github-actions-build.yml/badge.svg"></a>
<a href="https://dragselect.com/ds.min.js"><img alt="gzip size" src="https://img.badgesize.io/https://dragselect.com/ds.min.js?compression=gzip"></a>
<a href="https://www.npmjs.com/package/dragselect"><img alt="npm downloads count" src="https://img.shields.io/npm/dt/dragselect.svg"></a>
<a href="https://github.com/ThibaultJanBeyer/DragSelect/blob/master/DragSelect/package.json"><img alt="No Dependency" src="https://img.shields.io/badge/dependencies-none-informational"></a>
<a href="https://github.com/ThibaultJanBeyer/DragSelect/blob/master/CONTRIBUTING.md"><img alt="Contributors Welcome" src="https://img.shields.io/badge/contributors-welcome-blueviolet"></a>
<a href="https://github.com/sponsors/ThibaultJanBeyer"><img alt="Sponsors Welcome" src="https://img.shields.io/badge/sponsors-welcome-blueviolet"></a>
</p>

# DragSelect [![GitHub release](https://img.shields.io/github/release/ThibaultJanBeyer/DragSelect.svg)](https://GitHub.com/ThibaultJanBeyer/DragSelect/releases/)

Select elements by dragging a box around them, like on your desktop, then drag and drop them. No dependencies, with official [React](https://dragselect.com/docs/guided-examples/React) and [Angular](https://dragselect.com/docs/guided-examples/Angular) bindings.

- 🧑‍💻 Project page and demo: [https://dragselect.com/](https://dragselect.com/)
- 📘 Docs: [https://dragselect.com/docs/intro](https://dragselect.com/docs/intro)

# TOC

- [Key-Features](#key-features)
- [Why?](#why)
- [Supporters](#supporters)
- [Installation](#installation)
- [Usage](#usage)
- [Have Fun!](#have-fun)
- [Docs](#docs)

# Key-Features

- **No dependencies** [![No Dependency](https://img.shields.io/badge/dependencies-none-informational)](https://github.com/ThibaultJanBeyer/DragSelect/blob/master/DragSelect/package.json)
- Hyper customizable
- Replicates operating system drag-selection in the browser
- Accessibility (a11y)
- Use modifier keys to make multiple independent selections
- Select, Drag and Drop also also via keyboard
- Supports all major browsers
- Lightweight, only ![gzip size](https://img.badgesize.io/https://dragselect.com/ds.min.js?compression=gzip)
- Popular: ![npm downloads count](https://img.shields.io/npm/dt/dragselect.svg) on npm
- DragSelect was written with Performance in mind (can easily select >15.000 Elements)
- Supports SVG
- Supports mobile (touch interaction)
- Free & open source
- Easy to use

[![demo-gif](https://dragselect.com/img/dragselect.gif)](https://dragselect.com/)

# Why?

Because apparently there was nothing that does not require jquery out there.  
This is better than https://jqueryui.com/selectable/ or https://jqueryui.com/draggable/ and has no dependencies.
It is used in multiple professional rich interface applications, i.e. to have a file management system. The user can select files to organize them and change their metadata, with this plugin our users could select multiple files and perform batch/bulk-operations (applying changes to multiple files at once). Another example is a huge, graphical cloud hosting manager with millions of active users. Users can select multiple servers, storages, etc. on an art-board to perform multi-operations, re-organize them, move them on the UI or batch-delete. We’re running it since January 18' it’s super helpful and very stable, let’s keep it that way. I can easily think of dozens other use-cases. I’m really keen to know how you use it in your projects, please let us know.

# Supporters

Please donate to support the countless hours of hard work & support. Especially if your company makes money, then there is no excuse. Thank you :)

If you're too poor or broke you can still support us with your time instead by [contributing to the code](https://github.com/ThibaultJanBeyer/DragSelect/blob/master/CONTRIBUTING.md)!

## Thanks To:

#### TestMu AI (LambdaTest)

<a href="https://www.lambdatest.com/" target="_blank">
  <picture>
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://www.testmuai.com/support/img/logo.svg"
    />
    <source
      media="(prefers-color-scheme: dark)"
      srcset="www/static/img/testmu-logo-white.svg"
    />
    <img
      alt="TestMu AI (LambdaTest)"
      width="147"
      src="https://www.testmuai.com/support/img/logo.svg"
    />
  </picture>
</a>

[TestMu AI (LambdaTest)](https://www.testmuai.com/) is a Next-Generation Mobile App and Cross Browser Testing Cloud. They support this open source projects by providing us with a free account and with a generous donation!

### BrowserStack

<a href="https://www.browserstack.com/"><img src="https://cdn.worldvectorlogo.com/logos/browserstack.svg" alt="Browserstack" width="100px" /></a>

[BrowserStack](https://www.browserstack.com/) is a service for cross-browser testing. They support this open source projects by providing us with a [free account](https://www.browserstack.com/open-source)!

### You?

[You?](https://github.com/sponsors/ThibaultJanBeyer)

Show your appreciation and support with a donation! [Direct Donation to DragSelect](https://www.blockchain.com/btc/address/1LdweSpjgSeJC8XxX3swrohBMBLUzg6cmC) (via Bitcoin: `1LdweSpjgSeJC8XxX3swrohBMBLUzg6cmC`). Or sponsor via [GitHub Sponsors](https://github.com/sponsors/ThibaultJanBeyer) or [Get in touch](mailto:thibault.beyer@gmail.com).

Donations are distributed with all project contributors proportionally to their involvement. We are grateful for any amount: we have more than ![npm downloads count](https://img.shields.io/npm/dt/dragselect.svg), imagine how much we'd have if everyone would have had donated only 1$ 🤩 (unfortunately this is just a dream). If you donate, we can display your logo here if you want, which will give you infinite fame, fortune and help you recruit great talent.

# Installation

```console
npm install dragselect
```

Or without a bundler:

```html
<script src="https://unpkg.com/dragselect@latest/dist/ds.min.js"></script>
```

> For `<script type="module">`, use `DragSelect.esm.js` or `ds.esm.min.js`. We don’t recommend linking directly for production. Please use `npm` if you can.

More ways to install in [Getting Started](https://dragselect.com/docs/intro).

# Usage

```javascript
import DragSelect from "dragselect";

const ds = new DragSelect({
  selectables: document.querySelectorAll(".selectable"),
  area: document.getElementById("area"), // optional: only select inside this element
});

ds.subscribe("DS:end", ({ items }) => console.log("selected", items));
```

> Hint: use "shift", "ctrl" or "command" to make multiple independent selections.

Using React or Angular? Use [`@dragselect/react`](https://dragselect.com/docs/guided-examples/React) or [`@dragselect/angular`](https://dragselect.com/docs/guided-examples/Angular).

All settings, events, methods and guides are in the [docs](#docs).

# Have Fun!

Creating and maintaining useful tools is a lot of work.
So don’t forget to give this repository a star if you find it useful.
Star this repo, tell all your friends and start contributing and/or [donating 1$](https://github.com/sponsors/ThibaultJanBeyer) to keep it running. Thank you :)

[![Typewriter Gif](https://dragselect.com/img/typewriter.gif)](https://thibaultjanbeyer.com/)

[http://dragselect.com/](http://dragselect.com/) | [documentation](http://dragselect.com/docs/intro)

<!-- docs:start (generated from www/docs by scripts/build-package-docs.js, don't edit) -->

# Docs

**Getting started**

- [Getting Started](https://dragselect.com/docs/intro): Install DragSelect and select your first elements in two minutes.
- [Coding agents](https://dragselect.com/docs/Coding-Agents): Give your AI coding agent the real docs: a skill, docs in node_modules and llms.txt.

**Guides**

- [Simple](https://dragselect.com/docs/guided-examples/Simple): The simplest setup: tell DragSelect which elements can be selected.
- [With an Area](https://dragselect.com/docs/guided-examples/Area): Limit selecting and dragging to one container, which also scrolls automatically.
- [With DropZones](https://dragselect.com/docs/guided-examples/DropZones): Drop selected elements on zones and find out what was dropped where.
- [Accessibility (a11y)](https://dragselect.com/docs/guided-examples/Accessibility): Select and drag with the keyboard.
- [Updating Settings](https://dragselect.com/docs/guided-examples/Updating-Settings): Change any setting after DragSelect has started.
- [Mobile/Touch usage](https://dragselect.com/docs/guided-examples/Mobile-Touch): Use DragSelect on touch devices and keep the page scrollable.
- [Publish & Subscribe](https://dragselect.com/docs/guided-examples/Publish-Subscribe): Listen to events like DS:start and DS:end.
- [React](https://dragselect.com/docs/guided-examples/React): The official React hooks: @dragselect/react.
- [Angular](https://dragselect.com/docs/guided-examples/Angular): The official Angular directives: @dragselect/angular.
- [Custom Drag and Drop](https://dragselect.com/docs/guided-examples/CustomDnD): Use your own drag and drop, or another library, together with DragSelect.
- [Advanced Overrides (Custom Selection Filter)](https://dragselect.com/docs/guided-examples/Custom-Selection-Filter-Override): Hook into the selection and change what gets selected.

**API**

- [Settings](https://dragselect.com/docs/API/Settings): Every setting, for new DragSelect() and setSettings().
- [Events (Pub/sub)](https://dragselect.com/docs/API/Events): Every event (DS:start, DS:end, DS:select…) and what it gives you.
- [Methods](https://dragselect.com/docs/API/Methods): Every method of a DragSelect instance.
- [CSS Classes (Styling)](https://dragselect.com/docs/API/CSS-Classes): The classes DragSelect adds, for styling.
- [Overrides & Exposed Methods (Advanced)](https://dragselect.com/docs/API/Overrides): Replace DragSelect's internal logic, e.g. what gets selected or dragged.

<!-- docs:end -->
