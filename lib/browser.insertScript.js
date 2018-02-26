const { head } = document

/**
 * Make a JSONP-like request to a remote URL
 * @param {String} src URL representative of external js file
 * @returns {void}
 */
const insertScript = (src) => {
    const dom = document.createElement('script')

    head.appendChild(dom)
    dom.src = src
    dom.parentNode.removeChild(dom)
}

module.exports = insertScript