/**
 * HTMLElement.querySelector wrapper
 * @param {String} q Standard CSS selector
 * @param {HTMLElement} dom Single HTMLElement / reference
 * @returns {HTMLElement} Single HTMLElement
 */
const oneDOM = (q, dom = document) => dom.querySelector(q)

module.exports = oneDOM