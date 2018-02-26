/**
 * Parse from String to a native type
 * @param {String} str String to evaluate
 * @returns {*} Native Object
 */
const val = (str) => {
    try {
        return JSON.parse(str)
    } catch (error) {
        return str
    }
}

module.exports = val