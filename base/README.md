# babel-npm-boilerplate [![Build Status](https://travis-ci.org/honewatson/babel-npm-boilerplate.svg)](https://travis-ci.org/honewatson/babel-npm-boilerplate) [![npm version](https://badge.fury.io/js/babel-npm-boilerplate.svg)](http://badge.fury.io/js/babel-npm-boilerplate)

A Boilerplate for ES6 Browser Apps using Babel, Webpack, FlowType, ESLint, Mocha and Chai

## What's inside

Minimal structure for a npm package source.

* Babel 6
* Mocha
* ESLint
* Isparta

## Installation

Clone this repo.

## Usage

* `npm run server` to run a dev server
* `npm run test` to run tests
* `npm run test:watch` watch for changes and run tests
* `npm run test:cov` to generate test coverage
* `npm run build` to transform es6/es7 to es5 by Babel
* `npm run clean` to clean `build/` directory
* `npm run lint` to lint js using ESLint in Airbnb's Javascript style

##

Html files use Nunjucks https://mozilla.github.io/nunjucks/.  On the dev server files can from html/ folder map to / on the server for example:

```
html/home.html -> http://localhost:3031/home.html
```

## Liscense

MIT

* cp files to