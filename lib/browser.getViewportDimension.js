const { documentElement: html, body } = document

/**
 * Get viewport dimension
 * @returns {*} Viewport dimension
 */
const getViewportDimension = () => ({
    w: window.innerWidth || html.clientWidth || body.clientWidth || 0,
    h: window.innerHeight || html.clientHeight || body.clientHeight || 0,
})

module.exports = getViewportDimension