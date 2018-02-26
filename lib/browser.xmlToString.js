/**
 * Create XML String representation from XML Element
 * @param {HTMLElement} xml XML Element
 * @returns {String} XML String
 */
const xmlToString = (xml) => xml.xml || new XMLSerializer().serializeToString(xml)

module.exports = xmlToString