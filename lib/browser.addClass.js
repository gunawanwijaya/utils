const eachDOMAndText = require('./browser.eachDOMAndText')

/**
 * Add a className to HTMLElement
 * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
 * CSS selector / Array of HTMLElement / NodeList
 * @param {String} str String to add to the className
 * @returns {void}
 */
const addClass = (dom, str) => {
    eachDOMAndText(dom, str, (f, u) => {
        if (f.classList) {
            f.classList.add(u)
        } else {
            f.className += ` ${u}`
        }
    })
}

module.exports = addClass