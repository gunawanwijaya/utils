const getViewportDimension = require('./browser.getViewportDimension')

/**
 * Check if the given HTMLElement is visible in viewport
 * @param {HTMLElement} dom Single HTMLElement
 * @returns {Boolean} Result
 */
const isDOMInViewport = (dom) => {
    const r = dom.getBoundingClientRect()
    const { w, h } = getViewportDimension()

    return r.top >= 0 && r.left >= 0 && r.right <= w && r.bottom <= h
}

module.exports = isDOMInViewport