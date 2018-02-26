const passiveEvent = require('./browser.passiveEvent')
const eachDOMAndText = require('./browser.eachDOMAndText')

/**
 * Remove event listener
 * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
 * CSS selector / Array of HTMLElement / NodeList
 * @param {String} evt String of event that will be removed
 * @param {Function} fn Callback function
 * @param {Boolean} psv Event passiveness, default to true in modern browser
 * @returns {void}
 */
const off = (dom, evt, fn, psv = passiveEvent) => {
    eachDOMAndText(dom, evt, (f, u) => {
        if (f.removeEventListener) {
            f.removeEventListener(u, fn, psv)
        } else
        if (f.detachEvent) {
            f.detachEvent(`on${u}`, fn)
        }
    })
}

module.exports = off