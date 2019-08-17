'use strict'
const bench = require('fastbench')
const deepCopy = require('deep-copy')
const lodashCloneDeep = require('lodash.clonedeep')
const cloneDeep = require('clone-deep')
const fastCopy = require('fast-copy').default
const obj = {a: 'a', b: 'b', c: 'c'}
const clone = require('..')
const cloneDefaults = clone()
const cloneProto = clone({proto: true})
const cloneCircles = clone({circles: true})
const cloneCirclesProto = clone({circles: true, proto: true})
const max = 1000
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^x$" }] */
var run = bench([
  function benchDeepCopy (cb) {
    for (var i = 0; i < max; i++) {
      deepCopy(obj)
    }
    setImmediate(cb)
  },
  function benchLodashCloneDeep (cb) {
    for (var i = 0; i < max; i++) {
      lodashCloneDeep(obj)
    }
    setImmediate(cb)
  },
  function benchCloneDeep (cb) {
    for (var i = 0; i < max; i++) {
      cloneDeep(obj)
    }
    setImmediate(cb)
  },
  function benchFastCopy (cb) {
    for (var i = 0; i < max; i++) {
      fastCopy(obj)
    }
    setImmediate(cb)
  },
  function benchObjectAssign (cb) {
    for (var i = 0; i < max; i++) {
      var x = Object.assign({}, obj)
    }
    setImmediate(cb)
  },
  function benchObjectSpread (cb) {
    for (var i = 0; i < max; i++) {
      var x = {...obj}
    }
    setImmediate(cb)
  },
  function benchRfdc (cb) {
    for (var i = 0; i < max; i++) {
      cloneDefaults(obj)
    }
    setImmediate(cb)
  },
  function benchRfdcProto (cb) {
    for (var i = 0; i < max; i++) {
      cloneProto(obj)
    }
    setImmediate(cb)
  },
  function benchRfdcCircles (cb) {
    for (var i = 0; i < max; i++) {
      cloneCircles(obj)
    }
    setImmediate(cb)
  },
  function benchRfdcCirclesProto (cb) {
    for (var i = 0; i < max; i++) {
      cloneCirclesProto(obj)
    }
    setImmediate(cb)
  }
], 100)

run(run)
