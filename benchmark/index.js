'use strict'
const bench = require('fastbench')
const deepCopy = require('deep-copy')
const cloneDeep = require('lodash.clonedeep')
const fastCopy = require('fast-copy').default
const obj = require('./fixture.json')
const clone = require('../src')
const cloneDefaults = clone()
const cloneProto = clone({proto: true})
const cloneCircles = clone({circles: true})
const cloneCirclesProto = clone({circles: true, proto: true})
const max = 1000

var run = bench([
  function benchDeepCopy (cb) {
    for (var i = 0; i < max; i++) {
      deepCopy(obj)
    }
    setImmediate(cb)
  },
  function benchLodashCloneDeep (cb) {
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
