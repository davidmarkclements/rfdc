'use strict'
module.exports = rfdc

function copyBuffer (cur) {
  if (cur instanceof Buffer) {
    return Buffer.from(cur)
  }

  return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length)
}

function rfdc (opts) {
  opts = opts || {}
  if (opts.circles) return rfdcCircles(opts)

  const constructorHandlers = new Map()
  constructorHandlers.set(Date, (o) => new Date(o))
  constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)))
  constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)))
  if (opts.constructorHandlers) {
    for (const handler of opts.constructorHandlers) {
      constructorHandlers.set(handler[0], handler[1])
    }
  }

  let handler = null

  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    const keys = Object.keys(a)
    const a2 = new Array(keys.length)
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i]
      const cur = a[k]
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        a2[k] = handler(cur, fn)
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur)
      } else {
        a2[k] = fn(cur)
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (Array.isArray(o)) return cloneArray(o, clone)
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, clone)
    }
    const o2 = {}
    for (const k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      const cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        o2[k] = handler(cur, clone)
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur)
      } else {
        o2[k] = clone(cur)
      }
    }
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, cloneProto)
    }
    const o2 = {}
    for (const k in o) {
      const cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        o2[k] = handler(cur, cloneProto)
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur)
      } else {
        o2[k] = cloneProto(cur)
      }
    }
    return o2
  }
}

function rfdcCircles (opts) {
  const constructorHandlers = new Map()
  constructorHandlers.set(Date, (o) => new Date(o))
  constructorHandlers.set(Map, (o, refs, fn) => new Map(cloneArray(Array.from(o), refs, fn)))
  constructorHandlers.set(Set, (o, refs, fn) => new Set(cloneArray(Array.from(o), refs, fn)))
  if (opts.constructorHandlers) {
    for (const handler of opts.constructorHandlers) {
      constructorHandlers.set(handler[0], handler[1])
    }
  }

  let handler = null
  return opts.proto ? cloneProto : clone

  function cloneArray (a, refs, fn) {
    const keys = Object.keys(a)
    const a2 = new Array(keys.length)
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i]
      const cur = a[k]
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur
      } else {
        const ref = refs.get(cur)
        if (ref !== undefined) {
          a2[k] = ref
        } else {
          let cur2
          if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            cur2 = handler(cur, refs, fn)
          } else if (ArrayBuffer.isView(cur)) {
            cur2 = copyBuffer(cur)
          } else {
            cur2 = fn(cur, refs)
          }
          refs.set(cur, cur2)
          a2[k] = cur2
        }
      }
    }
    return a2
  }

  function clone (o, refs = new Map()) {
    if (typeof o !== 'object' || o === null) return o
    if (Array.isArray(o)) return cloneArray(o, refs, clone)
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, refs, clone)
    }
    const o2 = {}
    refs.set(o, o2)
    for (const k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      const cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else {
        const ref = refs.get(cur)
        if (ref !== undefined) {
          o2[k] = ref
        } else {
          let cur2
          if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            cur2 = handler(cur, refs, clone)
          } else if (ArrayBuffer.isView(cur)) {
            cur2 = copyBuffer(cur)
          } else {
            cur2 = clone(cur, refs)
          }
          refs.set(cur, cur2)
          o2[k] = cur2
        }
      }
    }
    return o2
  }

  function cloneProto (o, refs = new Map()) {
    if (typeof o !== 'object' || o === null) return o
    if (Array.isArray(o)) return cloneArray(o, refs, cloneProto)
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, refs, cloneProto)
    }
    const o2 = {}
    refs.set(o, o2)
    for (const k in o) {
      const cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else {
        const ref = refs.get(cur)
        if (ref !== undefined) {
          o2[k] = ref
        } else {
          let cur2
          if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            cur2 = handler(cur, refs, cloneProto)
          } else if (ArrayBuffer.isView(cur)) {
            cur2 = copyBuffer(cur)
          } else {
            cur2 = cloneProto(cur, refs)
          }
          refs.set(cur, cur2)
          o2[k] = cur2
        }
      }
    }
    return o2
  }
}
