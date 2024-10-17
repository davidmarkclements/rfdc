'use strict'

/* global structuredClone */

const bench = require('fastbench')
const lodashCloneDeep = require('lodash.clonedeep')
const fastCopy = require('fast-copy').default
const obj = require('./circles-fixture')
const clone = require('..')
const nanoCopy = require('nano-copy')
const ramdaClone = require('ramda').clone
const cloneCircles = clone({ circles: true })
const cloneCirclesProto = clone({ circles: true, proto: true })
const max = 1000

const run = bench([
  function benchLodashCloneDeep (cb) {
    for (let i = 0; i < max; i++) {
      lodashCloneDeep(obj)
    }
    setImmediate(cb)
  },
  function benchFastCopy (cb) {
    for (let i = 0; i < max; i++) {
      fastCopy(obj)
    }
    setImmediate(cb)
  },
  function benchNanoCopy (cb) {
    for (let i = 0; i < max; i++) {
      nanoCopy(obj)
    }
    setImmediate(cb)
  },
  function benchRamdaClone (cb) {
    for (let i = 0; i < max; i++) {
      ramdaClone(obj)
    }
    setImmediate(cb)
  },
  function benchRfdcCircles (cb) {
    for (let i = 0; i < max; i++) {
      cloneCircles(obj)
    }
    setImmediate(cb)
  },
  function benchRfdcCirclesProto (cb) {
    for (let i = 0; i < max; i++) {
      cloneCirclesProto(obj)
    }
    setImmediate(cb)
  },
  function benchStructuredClone (cb) {
    for (let i = 0; i < max; i++) {
      structuredClone(obj)
    }
    setImmediate(cb)
  }
], 100)

run(run)
