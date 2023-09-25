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

easily add a selection algorithm to your application/website.

The documentation is being migrated to [https://dragselect.com/](https://dragselect.com/). Find the [most up to date documentation there](http://dragselect.com/docs/intro).

# TOC

- [Project Page: Demo \& Info](#project-page-demo--info)
- [Key-Features](#key-features)
- [Why?](#why)
- [Supporters](#supporters)
- [Installation](#installation)
- [Usage](#usage)
- [Constructor Properties (Settings)](#constructor-properties-settings)
- [Event Callbacks](#event-callbacks)
- [Methods](#methods)
- [CSS Classes](#css-classes)
- [Have Fun!](#have-fun)

# Project Page: Demo & Info

- 🧑‍💻 Project Page: [https://dragselect.com/](https://dragselect.com/)
- 📘 Docs Page: [https://dragselect.com/docs/intro](https://dragselect.com/docs/intro)

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

| <a href="https://www.browserstack.com/"><img src="https://cdn.worldvectorlogo.com/logos/browserstack.svg" alt="Browserstack" width="100px" /></a>                                                             | <a href="https://www.digitalocean.com/"><img src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_vertical_blue.svg" alt="DigitalOcean" width="150px" /></a>                       | [You?](https://github.com/sponsors/ThibaultJanBeyer)                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [BrowserStack](https://www.browserstack.com/) is a service for cross-browser testing. They support this open source projects by providing us with a [free account](https://www.browserstack.com/open-source)! | [DigitalOcean](https://www.digitalocean.com/) is a cloud hosting service. They support this open source projects by providing us with [free credits](https://www.digitalocean.com/open-source/credits-for-projects)! | Thank and support us by making a [Direct Donation to DragSelect](https://www.blockchain.com/btc/address/1LdweSpjgSeJC8XxX3swrohBMBLUzg6cmC) (via Bitcoin: `1LdweSpjgSeJC8XxX3swrohBMBLUzg6cmC`). Or sponsor via [GitHub Sponsors](https://github.com/sponsors/ThibaultJanBeyer) or [Get in touch](mailto:thibault.beyer@gmail.com). |

Donations are distributed with all project contributors proportionally to their involvement. We are grateful for any amount: we have more than ![npm downloads count](https://img.shields.io/npm/dt/dragselect.svg), imagine how much we'd have if everyone would have had donated only 1$ 🤩 (unfortunately this did not happen). If you donate, we can display your logo here if you want, which will give you fame, fortune and help you recruit great talent and boosting your SEO.

# Installation

Read the [Getting Started](http://dragselect.com/docs/intro).

## NPM

```console
npm install --save dragselect
```

## Yarn

```console
yarn add dragselect
```

## Global

You can still [download the file](https://dragselect.com/DragSelect.js) ([minified](https://dragselect.com/ds.min.js)) and add it to your document:

```html
<script src="https://unpkg.com/dragselect@latest/dist/ds.min.js"></script>
```

> Note: if you are using `<script type=module` you can use the `DragSelect.esm.js` or `ds.esm.min.js` files as they include `export default DragSelect`

> We don’t recommend the direct linking for production set-up. Please use `npm` if you can.

## That's it, you're ready to rock!

Of course you can also just include the code within your code and bundle it to save a request.

DragSelect supports `module.exports`, `AMD Modules` with `define`, `es6 modules` with `.esm` versions and has a fallback to global namespace for maximum out of the box support.

# Usage

Now in your JavaScript you can simply pass elements to the function like so:

## Simple

Read the [Simple Usage Guide](http://dragselect.com/docs/guided-examples/Simple)

The simplest possible usage.  
Choose which elements can be selected:

```javascript
new DragSelect({
  selectables: document.getElementsByClassName("selectable-nodes"),
});
```

Find a live [example in the Guide](http://dragselect.com/docs/guided-examples/Simple)

## Within a Scroll-Able Area

Read the [Area Guide](http://dragselect.com/docs/guided-examples/Area)

Here the selection is constrained. You can only use the selection/drag inside of the area container:

```javascript
new DragSelect({
  selectables: document.getElementsByClassName("selectable-nodes"),
  area: document.getElementById("area"),
});
```

Find a live [example in the Area Guide](http://dragselect.com/docs/guided-examples/Area)

## With DropZones

Read the [DropZones Guide](http://dragselect.com/docs/guided-examples/DropZones) where you’ll also find a live example.

## Extended

All options are optional. You could also just initiate the Dragselect by `new DragSelect({});` without any option.

Find all possible properties and methods in **[the docs](https://dragselect.com/docs/category/api)**

> Hint: you can also use the "shift", "ctrl" or "command" key to make multiple independent selections.

## React

Read the [React Guide](http://dragselect.com/docs/guided-examples/React)

## Mobile/Touch usage

Read the [Mobile Touch Guide](http://dragselect.com/docs/guided-examples/Mobile-Touch)

## Accessibility (a11y)

**DragSelect is accessible by default**:

> TLDR;  
> => Your `selectables` should be buttons: `<button type="button"></button>`.  
> => <kbd>ArrowKeys</kbd> are used for keyboard dragging.

Read the [Accessibility Guide](http://dragselect.com/docs/guided-examples/Accessibility)

## Use Your Own Drag & Drop

Read the [Custom Drag and Drop Guide](http://dragselect.com/docs/guided-examples/CustomDnD)

# Constructor Properties (Settings)

_DragSelect is hyper customizable_. Note, all properties are optional.

Read the [Settings API docs](http://dragselect.com/docs/API/Settings)

Moreover any setting can also be updated or added after the initialization, see [post-initialization setting updates](#post-initialization-setting-updates).

## Post-Initialization Setting-Updates

Any setting can be updated/added after initialization by using the `setSettings` method. Here is an example updating the `area` and the `selectables`:

```JavaScript
const ds = new DragSelect({})
ds.setSettings({
  selectables: document.getElementsByClassName('selectable-nodes'),
  area: document.getElementById('area')
})
```

# Event Callbacks

Read the [Events API docs](http://dragselect.com/docs/API/Events)

Event Callbacks are used like this:

```JavaScript
ds.subscribe('<event_name>', (callback_object) => {})
```

For all available callback `event_names` and their respective `callback_object`, please read the [Events API docs](http://dragselect.com/docs/API/Events)

# Methods

Read the [Methods API docs](http://dragselect.com/docs/API/Methods)

# CSS Classes

Read the [CSS Classes API docs](http://dragselect.com/docs/API/CSS-Classes)

# Have Fun!

Creating and maintaining useful tools is a lot of work.
So don’t forget to give this repository a star if you find it useful.
Star this repo, tell all your friends and start contributing and/or [donating 1$](https://github.com/sponsors/ThibaultJanBeyer) to keep it running. Thank you :)

[![Typewriter Gif](https://dragselect.com/img/typewriter.gif)](https://thibaultjanbeyer.com/)

[http://dragselect.com/](http://dragselect.com/) | [documentation](http://dragselect.com/docs/intro)
