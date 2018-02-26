const is = require('./is')

/**
 * Looping a callback function with one argument of String
 * @param {String | Array<String>} str String or Array<String> to evaluate
 * @param {Function} fn Callback function with one argument of String
 * @param {String} delimiter Use to split a String
 * @returns {void}
 */
const eachText = (str, fn, delimiter = ' ') => {
    if (str && fn) {
        str = is(str, String) ? str.split(delimiter) : str
        str.forEach((i) => i && fn(i))
    }
}

module.exports = eachText