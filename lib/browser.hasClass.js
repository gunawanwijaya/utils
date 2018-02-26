/**
 * Is an element have a specific className
 * @param {HTMLElement} dom Single HTMLElement
 * @param {String} str String to compare against the className
 * @returns {Boolean} Result
 */
const hasClass = (dom, str) => new RegExp(` ${str} `).test(` ${dom.className} `)

module.exports = hasClass