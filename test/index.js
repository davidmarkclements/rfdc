'use strict'

const { test } = require('tap')
const rfdc = require('..')
const clone = rfdc()
const cloneProto = rfdc({proto: true})

test('number', async ({is}) => {
  is(clone(42), 42, 'same value')
})
test('string', async ({is}) => {
  is(clone('str'), 'str', 'same value')
})
test('boolean', async ({is}) => {
  is(clone(true), true, 'same value')
})
test('function', async ({is}) => {
  const fn = () => {}
  is(clone(fn), fn, 'same function')
})
test('date', async ({is, isNot}) => {
  const date = new Date()
  is(+clone(date), +date, 'same value')
  isNot(clone(date), date, 'different object') 
})
test('null', async ({is}) => {
  is(clone(null), null, 'same value') 
})
test('shallow object', async ({same, isNot}) => {
  const o = {a: 1, b: 2}
  same(clone(o), o, 'same values')
  isNot(clone(o), o, 'different object')
})
test('shallow array', async ({same, isNot}) => {
  const o = [1, 2]
  same(clone(o), o, 'same values')
  isNot(clone(o), o, 'different arrays')
})
test('deep object', async ({same, isNot}) => {
  const o = {nest: {a: 1, b: 2}}
  same(clone(o), o, 'same values')
  isNot(clone(o), o, 'different objects')
  isNot(clone(o).nest, o.nest, 'different nested objects')
})
test('deep array', async ({same, isNot}) => {
  const o = [ {a: 1, b: 2}, [3] ]
  same(clone(o), o, 'same values')
  isNot(clone(o), o, 'different arrays')
  isNot(clone(o)[0], o[0], 'different array elements')
  isNot(clone(o)[1], o[1], 'different array elements')
})
test('nested number', async ({is}) => {
  is(clone({a: 1}).a, 1, 'same value')
})
test('nested string', async ({is}) => {
  is(clone({s: 'str'}).s, 'str', 'same value')
})
test('nested boolean', async ({is}) => {
  is(clone({b: true}).b, true, 'same value')
})
test('nested function', async ({is}) => {
  const fn = () => {}
  is(clone({fn}).fn, fn, 'same function')
})
test('nested date', async ({is, isNot}) => {
  const date = new Date()
  is(+clone({d: date}).d, +date, 'same value')
  isNot(clone({d: date}).d, date, 'different object') 
})
test('nested null', async ({is}) => {
  is(clone({n: null}).n, null, 'same value')
})
test('by default does not copy proto properties', async ({is}) => {
  is(clone(Object.create({a: 1})).a, undefined, 'value not copied')
})
test('proto option – copies enumerable proto properties', async ({is}) => {
  is(cloneProto(Object.create({a: 1})).a, 1, 'value copied')
})
test('proto option – number', async ({is}) => {
  is(cloneProto(42), 42, 'same value')
})
test('proto option – string', async ({is}) => {
  is(cloneProto('str'), 'str', 'same value')
})
test('proto option – boolean', async ({is}) => {
  is(cloneProto(true), true, 'same value')
})
test('proto option – function', async ({is}) => {
  const fn = () => {}
  is(cloneProto(fn), fn, 'same function')
})
test('proto option – date', async ({is, isNot}) => {
  const date = new Date()
  is(+cloneProto(date), +date, 'same value')
  isNot(cloneProto(date), date, 'different object') 
})
test('proto option – null', async ({is}) => {
  is(cloneProto(null), null, 'same value') 
})
test('proto option – shallow object', async ({same, isNot}) => {
  const o = {a: 1, b: 2}
  same(cloneProto(o), o, 'same values')
  isNot(cloneProto(o), o, 'different object')
})
test('proto option – shallow array', async ({same, isNot}) => {
  const o = [1, 2]
  same(cloneProto(o), o, 'same values')
  isNot(cloneProto(o), o, 'different arrays')
})
test('proto option – deep object', async ({same, isNot}) => {
  const o = {nest: {a: 1, b: 2}}
  same(cloneProto(o), o, 'same values')
  isNot(cloneProto(o), o, 'different objects')
  isNot(cloneProto(o).nest, o.nest, 'different nested objects')
})
test('proto option – deep array', async ({same, isNot}) => {
  const o = [ {a: 1, b: 2}, [3] ]
  same(cloneProto(o), o, 'same values')
  isNot(cloneProto(o), o, 'different arrays')
  isNot(cloneProto(o)[0], o[0], 'different array elements')
  isNot(cloneProto(o)[1], o[1], 'different array elements')
})
test('proto option – nested number', async ({is}) => {
  is(cloneProto({a: 1}).a, 1, 'same value')
})
test('proto option – nested string', async ({is}) => {
  is(cloneProto({s: 'str'}).s, 'str', 'same value')
})
test('proto option – nested boolean', async ({is}) => {
  is(cloneProto({b: true}).b, true, 'same value')
})
test('proto option – nested function', async ({is}) => {
  const fn = () => {}
  is(cloneProto({fn}).fn, fn, 'same function')
})
test('proto option – nested date', async ({is, isNot}) => {
  const date = new Date()
  is(+cloneProto({d: date}).d, +date, 'same value')
  isNot(cloneProto({d: date}).d, date, 'different object') 
})
test('proto option – nested null', async ({is}) => {
  is(cloneProto({n: null}).n, null, 'same value')
})