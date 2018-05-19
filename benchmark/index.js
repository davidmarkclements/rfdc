'use strict'
const bench = require('fastbench')
const deepCopy = require('deep-copy')
const cloneDeep = require('lodash.clonedeep')
const fastCopy = require('fast-copy').default
const clone = require('..')
const cloneDefaults = clone()
const cloneProto = clone({proto: true})
const { readFileSync } = require('fs')
const { join } = require('path')
const max = 1000
const objs = [...Array(max)].map(() => JSON.parse(readFileSync(join(__dirname, 'fixture.json'))))

var run = bench([
  function benchDeepCopy (cb) {
    for (var i = 0; i < max; i++) {
      deepCopy(objs[i])
    }
    setImmediate(cb)
  },
  function benchLodashCloneDeep (cb) {
    for (var i = 0; i < max; i++) {
      cloneDeep(objs[i])
    }
    setImmediate(cb)
  },
  function benchFastCopy (cb) {
    for (var i = 0; i < max; i++) {
      fastCopy(objs[i])
    }
    setImmediate(cb)
  },
  function benchRfdc (cb) {
    for (var i = 0; i < max; i++) {
      cloneDefaults(objs[i])
    }
    setImmediate(cb)
  },
  function benchRfdcProto (cb) {
    for (var i = 0; i < max; i++) {
      cloneProto(objs[i])
    }
    setImmediate(cb)
  }
], 100)

run(run)
