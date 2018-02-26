const is = require('./is')
const allDOM = require('./browser.allDOM')

/**
 * Looping a callback function with one argument of HTMLElement
 * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
 * CSS selector / Array of HTMLElement / NodeList
 * @param {Function} fn Callback function with one argument of HTMLElement
 * @returns {void}
 */
const eachDOM = (dom, fn) => {
    let tmp = 0

    if (dom && fn) {
        if (is(dom, Array)) {
            tmp = dom
        } else
        if (is(dom, String)) {
            tmp = allDOM(dom)
        } else
        if (is(dom, HTMLElement) || window) {
            tmp = [dom]
        } else
        if (is(dom, NodeList)) {
            tmp = [...dom]
        }
        tmp.forEach((i) => i && fn(i))
    }
}

module.exports = eachDOM