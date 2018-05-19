# rfdc

Really Fast Deep Clone

## Usage

```js
const clone = require('rfdc')()
clone({a: 1, b: {c: 2}}) // => {a: 1, b: {c: 2}}
```

## API

### `require('rfdc')(opts = { proto: false }) => clone(obj) => obj2`

#### `proto` option

It's faster to allow enumerable properties on the prototype 
to be copied into the cloned object (not onto it's prototype,
directly onto the object).

To explain by way of code: 

```js
require('rfdc')({ proto: false })(Object.create({a: 1})) // => {}
require('rfdc')({ proto: true })(Object.create({a: 1})) // => {a: 1}
``` 

If this behavior is acceptable, set
`proto` to `true` for an additional 15% performance boost
(see benchmarks).

### Types

`rdfc` clones all JSON types:

* `Object` 
* `Array`
* `Number`
* `String`
* `null`

With additional support for:

* `Date` (copied)
* `undefined` (copied)
* `Function` (referenced)
* `AsyncFunction` (referenced)
* `GeneratorFunction` (referenced)
* `arguments` (copied to a normal object)

All other types have output values that match the output
of `JSON.parse(JSON.stringify(o))`.

For instance: 

```js
const rdfc = require('rdfc')()
const err = Error()
err.code = 1
JSON.parse(JSON.stringify(e)) // {code: 1}
rdfc(e) // {code: 1}

JSON.parse(JSON.stringify(new Uint8Array([1, 2, 3]))) //  {'0': 1, '1': 2, '2': 3 }
rdfc(new Uint8Array([1, 2, 3])) //  {'0': 1, '1': 2, '2': 3 }

JSON.parse(JSON.stringify({rx: /foo/})) // {rx: {}}
rdfc({rx: /foo/}) // {rx: {}}
```

## Benchmarks

```sh
npm run bench
```

```
benchDeepCopy*100: 639.536ms
benchLodashCloneDeep*100: 1724.347ms
benchFastCopy*100: 905.749ms
benchRfdc*100: 567.140ms
benchRfdcProto*100: 478.072ms
```

## Tests

```sh
npm test
```

```
62 passing (293.154ms)
```

### Coverage

```sh
npm run cov 
```

```
----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |      100 |      100 |      100 |      100 |                   |
 index.js |      100 |      100 |      100 |      100 |                   |
----------|----------|----------|----------|----------|-------------------|
```

## License

MIT