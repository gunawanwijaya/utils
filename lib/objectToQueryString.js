const is = require('./is')

/**
 * QueryString-ified version of an object
 * @param {*} obj Source object to QueryString-ified
 * @param {*} ptr Recursive pointer
 * @returns {String} QueryString
 */
const objectToQueryString = (obj, ptr) => {
    return Object.keys(obj)
        .map((key) => {
            const tmp = ptr ? `${ptr}[${key}]` : key

            obj[key] = is(obj[key], Array) ? `[${obj[key]}]` : obj[key]

            return is(obj[key], Object) ? objectToQueryString(obj[key], tmp) : `${tmp}=${obj[key]}`
        })
        .join('&')
}

module.exports = objectToQueryString