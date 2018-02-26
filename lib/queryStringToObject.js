const is = require('./is')
const val = require('./val')
const merge = require('./merge')

/**
 * Parse QueryString to an Object
 * @param {String} str QueryString
 * @returns {*} Object
 */
const queryStringToObject = (str) => {
    str = str || (window && window.location.search.substr(1))

    return is(str, String) && str.split('&')
        .map((v) => v.split('='))
        .reduce((obj, [k, v]) => {
            v = is(val(v), String) ? `"${v}"` : v
            k = k && v ? k
                .split(/\[|\]/g)
                .filter((k) => k)
                .reverse()
                .reduce((acc, curr) => `{"${curr}":${acc || v}}`, '') : {}

            return merge(obj, val(k))
        }, {})
}

module.exports = queryStringToObject