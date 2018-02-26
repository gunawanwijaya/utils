/**
 * HTMLElement.querySelectorAll wrapper to return an Array of HTMLElement instead of NodeList
 * @param {String} q Standard CSS selector
 * @param {HTMLElement} dom Single HTMLElement / reference
 * @returns {Array<HTMLElement>} Array of HTMLElement
 */
const allDOM = (q, dom = document) => [...dom.querySelectorAll(q)]

module.exports = allDOM