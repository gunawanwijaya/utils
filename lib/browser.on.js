const passiveEvent = require('./browser.passiveEvent')
const eachDOMAndText = require('./browser.eachDOMAndText')

/**
 * Add event listener
 * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
 * CSS selector / Array of HTMLElement / NodeList
 * @param {String} evt String of event that will be added
 * @param {Function} fn Callback function
 * @param {Boolean} psv Event passiveness, default to true in modern browser
 * @returns {void}
 */
const on = (dom, evt, fn, psv = passiveEvent) => {
    eachDOMAndText(dom, evt, (f, u) => {
        if (f.addEventListener) {
            f.addEventListener(u, fn, psv)
        } else
        if (f.attachEvent) {
            f.attachEvent(`on${u}`, fn)
        }
    })
}

module.exports = on