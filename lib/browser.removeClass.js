const eachDOMAndText = require('./browser.eachDOMAndText')

/**
 * Remove a className to HTMLElement
 * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
 * CSS selector / Array of HTMLElement / NodeList
 * @param {String} str String to remove to the className
 * @returns {void}
 */
const removeClass = (dom, str) => {
    eachDOMAndText(dom, str, (f, u) => {
        if (f.classList) {
            f.classList.remove(u)
        } else {
            f.className = f.className.split(u).join('')
        }
    })
}

module.exports = removeClass