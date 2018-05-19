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

### Benchmarks

```sh
npm run bench
```

```
benchDeepCopy*100: 624.535ms
benchLodashCloneDeep*100: 1740.670ms
benchRfdc*100: 547.896ms
benchRfdcProto*100: 467.896ms
```

### Tests

```sh
npm test
```

```
52 passing (287.896ms)
```

#### Coverage

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