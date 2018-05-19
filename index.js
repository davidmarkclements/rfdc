'use strict'
module.exports = rfdc

function rfdc (opts) {
  opts = opts || {}
  const proto = opts.proto || false

  return proto ? cloneProto : clone

  function clone (o) {
    const type = typeof o
    if (type === 'function') return o
    if (o === null || type !== 'object') return o
    if (o instanceof Date) return new Date(o)
    const o2 = Array.isArray(o) ? new Array(o.length) : {}
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      var cur = o[k]
      if (typeof cur === 'function') {
        o2[k] = cur
        continue
      }
      if (cur === null) {
        o2[k] = null
        continue
      }
      if (typeof cur === 'object') {
        if (cur instanceof Date) {
          o2[k] = new Date(cur)
          continue
        }
        o2[k] = clone(cur)
        continue
      }
      o2[k] = cur
    }

    return o2
  }

  function cloneProto (o) {
    const type = typeof o
    if (type === 'function') return o
    if (o === null || type !== 'object') return o
    if (o instanceof Date) return new Date(o)
    const o2 = Array.isArray(o) ? new Array(o.length) : {}
    for (var k in o) {
      var cur = o[k]
      if (typeof cur === 'function') {
        o2[k] = cur
        continue
      }
      if (cur === null) {
        o2[k] = null
        continue
      }
      if (typeof cur === 'object') {
        if (cur instanceof Date) {
          o2[k] = new Date(cur)
          continue
        }
        o2[k] = cloneProto(cur)
        continue
      }
      o2[k] = cur
    }

    return o2
  }
}
