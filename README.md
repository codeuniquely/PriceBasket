Price Basket
============

This is a simple shopping basket written in node.js
It accepts items as specified in src/priceList.js - Apples, Bread, Milk, Soup
and generates output detailing the original cost, discount and total payment.

```
Subtotal: £3.10
Apples 10% off: -10p
Total price: £3.00
```

or

```
Subtotal: £1.30
(No offers available)
Total price: £1.30
```

Install the Code
================
The application makes use of various NPM packages, pulled into a WebPack build envionment.
The assumption is that you are running a node v6.xx.xx (i was running 6.10.3) and npm 3.xx.xx
I was ruuning with 3.10.10

To install the development environment, in the folder that you copied this code into, type:
```
npm install
```

The project is written in JavaScript (ES6/ES2015) and is built with WebPack 2 which runs and transpiles the
code using BabelJS. WebPack 2 supports ES6 but Mocha does not fully (currently) so it has to be transpiled
for Mocha to run without issue. The tests themselves are split by code module and use Chai (expect) and the
Mocha BDD reporter.

Building the project
====================
WebPack is used to create the resultant final single, (and transpiled) file
which is written into the build folder, along with it's source map file.

```
npm run build
```

Running the Tests
=================
The various webpack-mocha / mocha / chai tests are in the tests folder

```
npm test
```

Code Style / Linting
====================
This is also a fully integrated ESLint / JSHint suite included in the development environment to allow
for the checking of the style, layout, correctlness and completeness of the development. The project is
currently configured for the 'majestic' rule set, but this can be altered for other ESLINT ruleset(s).
To run the checks type:
```
npm run lint
```

Running the build at the Command line in node.js
================================================
```
node build/PriceBasket Apples Milk Bread
```

Developer Debugging
===================
I have also included the .vscode folder with the appropiate tasks.json and launch.json
configuration to allow you to run and debug through the application using the Visual
Studio Code (other debugging/inspect options are available, use what you know best...)
