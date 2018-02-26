/**
 * Wrap a dom in a newly created HTMLElement
 * @param {HTMLElement} dom Single HTMLElement
 * @param {HTMLElement} x newly created HTMLElement
 * @returns {void}
 */
const wrapDOM = (dom, x) => dom.parentNode.insertBefore(x, dom) && x.appendChild(dom)

module.exports = wrapDOM