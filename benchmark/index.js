'use strict'
const bench = require('fastbench')
const deepCopy = require('deep-copy')
const lodashCloneDeep = require('lodash.clonedeep')
const cloneDeep = require('clone-deep')
const fastCopy = require('fast-copy').default
const obj = require('./fixture.json')
const clone = require('..')
const copyFastestJsonCopy = require('fastest-json-copy').copy
const plainObjectClone = require('plain-object-clone')
const nanoCopy = require('nano-copy')
const ramdaClone = require('ramda').clone
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
  function benchFastestJsonCopy (cb) {
    for (var i = 0; i < max; i++) {
      copyFastestJsonCopy(obj)
    }
    setImmediate(cb)
  },
  function benchPlainObjectClone (cb) {
    for (var i = 0; i < max; i++) {
      plainObjectClone(obj)
    }
    setImmediate(cb)
  },
  function benchNanoCopy (cb) {
    for (var i = 0; i < max; i++) {
      nanoCopy(obj)
    }
    setImmediate(cb)
  },
  function benchRamdaClone (cb) {
    for (var i = 0; i < max; i++) {
      ramdaClone(obj)
    }
    setImmediate(cb)
  },
  function benchJsonParseJsonStringify (cb) {
    for (var i = 0; i < max; i++) {
      JSON.parse(JSON.stringify(obj))
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
