const { head } = document

/**
 * Add new css style via <style>
 * @param {String} css Valid CSS syntax string
 * @returns {void}
 */
const insertStyle = (css) => {
    const dom = document.createElement('style')

    head.appendChild(dom)
    dom.appendChild(document.createTextNode(css))
}

module.exports = insertStyle