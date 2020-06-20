'use strict'
var rfdc = require('../index.js')

module.exports = clone

function clone (o) {
  return rfdc()(o)
}
