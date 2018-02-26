const is = require('./is')

/**
 * Deep merge two or more Object, set `a` as `{}` to preserve immutable
 * @param {Object} a Mutated Object
 * @param {Object|Array<Object>} b Object / Array of Object
 * @returns {Object} Merged Object
 */
const merge = (a, b) => {
    b = is(b, Object) ? [b] : b
    if (!a || !b) {
        throw new Error('MergeError')
    }
    b.forEach((c) => {
        Object.keys(c).forEach((p) => {
            a[p] = is(c[p], Object)
                ? merge(Object.assign({}, a[p]), c[p])
                : c[p]
        })
    })

    return a
}

module.exports = merge