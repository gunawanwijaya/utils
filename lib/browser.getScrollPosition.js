/**
 * Get scroll position
 * @returns {*} Scroll position
 */
const getScrollPosition = () => ({
    x: window.scrollX || window.scrollLeft || 0,
    y: window.scrollY || window.scrollTop || 0,
})

module.exports = getScrollPosition