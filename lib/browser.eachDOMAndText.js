const eachText = require('./eachText')
const eachDOM = require('./browser.eachDOM')

/**
 * Looping callback function with two argument of HTMLElement & String
 * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
 * CSS selector / Array of HTMLElement / NodeList
 * @param {String | Array<String>} str String or Array<String> to evaluate
 * @param {Function} fn Callback function with two argument of HTMLElement & String
 * @returns {void}
 */
const eachDOMAndText = (dom, str, fn) => {
    if (dom && str && fn) {
        eachDOM(dom, (A) => eachText(str, (B) => A && B && fn(A, B)))
    }
}

module.exports = eachDOMAndText