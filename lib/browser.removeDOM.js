/**
 * Remove single HTMLElement / reference
 * @param {HTMLElement} dom Single HTMLElement / reference
 * @returns {void}
 */
const removeDOM = (dom) => dom && dom.parentNode.removeChild(dom)

module.exports = removeDOM