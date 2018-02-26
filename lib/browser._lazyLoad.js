const noop = require('./noop')
const eachDOM = require('./browser.eachDOM')
const removeClass = require('./browser.removeClass')
const isDOMInViewport = require('./browser.isDOMInViewport')

/**
 * Remove lazyload class name from .lazyload & inject src into it
 * @param {HTMLElement} dom HTMLElement
 * @param {*} str className
 * @returns {void}
 */
const lazyLoad = (dom = 'img.lazyload', str = 'lazyload') => {
    eachDOM(dom, (img) => {
        if (isDOMInViewport(img) && img.dataset.src && img.src.indexOf('data:image') === 0) {
            img.src = img.dataset.src
            img.dataset.src = noop()
            removeClass(img, str)
        }
    })
}

module.exports = lazyLoad