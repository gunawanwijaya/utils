const eachDOMAndText = require('./browser.eachDOMAndText')
const hasClass = require('./browser.hasClass')
const addClass = require('./browser.addClass')
const removeClass = require('./browser.removeClass')

/**
 * Toggle a className to HTMLElement
 * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
 * CSS selector / Array of HTMLElement / NodeList
 * @param {String} str String to evaluate against the className
 * @returns {void}
 */
const toggleClass = (dom, str) => {
    eachDOMAndText(dom, str, (f, u) => {
        if (hasClass(f, u)) {
            removeClass(f, u)
        } else {
            addClass(f, u)
        }
    })
}

module.exports = toggleClass