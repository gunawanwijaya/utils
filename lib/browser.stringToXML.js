/**
 * Create XML Element representation from XML String
 * @param {String} str XML String
 * @returns {HTMLElement} XML Element
 */
const stringToXML = (str) => new DOMParser().parseFromString(str, 'text/xml')

module.exports = stringToXML