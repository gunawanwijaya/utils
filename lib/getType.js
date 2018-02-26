const noop = require('./noop')

/**
 * Get a type of an object
 * @param {*} obj Object to check
 * @returns {String} Result
 */
const getType = (obj) => {
    try {
        return obj.constructor
    } catch (error) {
        return noop()
    }
}

module.exports = getType