/**
 * Make a valid HTMLElement from a string
 * @param {String} str A valid HTML syntax string
 * @returns {HTMLElement} Single HTMLElement
 */
const stringToDOM = (str) => {
    const dom = document.createElement('div')

    dom.innerHTML = str

    return dom.firstChild
}

module.exports = stringToDOM