const getType = require('./getType')

/**
 * Type checking an object
 * @param {*} obj Object to check
 * @param {*} type Type to evaluate
 * @returns {Boolean} Result
 */
const is = (obj, type) => getType(obj) === type

module.exports = is