import { expectType } from 'tsd';
import rfdc = require('./index.js');

const clone = rfdc();

expectType<number>(clone(5));
expectType<{ lorem: string }>(clone({ lorem: "ipsum" }));

const cloneHandlers = rfdc({
  constructorHandlers: [
    [RegExp, (o) => new RegExp(o)],
  ],
})
