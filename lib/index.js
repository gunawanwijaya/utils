/* eslint no-unused-vars: 0, global-require: 0 */
const is = require('./is')
const noop = require('./noop')
const merge = require('./merge')
const isBrowser = is(module, noop())
const { version } = require('../package')
const { log, warn } = console

/** @returns {*} NativeUtils */
const NativeUtils = merge({}, {
    version,
    noop: require('./noop'),
    val: require('./val'),
    getType: require('./getType'),
    is: require('./is'),
    eachText: require('./eachText'),
    merge: require('./merge'),
    objectToQueryString: require('./objectToQueryString'),
    queryStringToObject: require('./queryStringToObject'),
})

try {
    merge(NativeUtils, {
        passiveEvent: require('./browser.passiveEvent'),
        oneDOM: require('./browser.oneDOM'),
        allDOM: require('./browser.allDOM'),
        removeDOM: require('./browser.removeDOM'),
        eachDOM: require('./browser.eachDOM'),
        eachDOMAndText: require('./browser.eachDOMAndText'),
        hasClass: require('./browser.hasClass'),
        addClass: require('./browser.addClass'),
        removeClass: require('./browser.removeClass'),
        toggleClass: require('./browser.toggleClass'),
        getScrollPosition: require('./browser.getScrollPosition'),
        getViewportDimension: require('./browser.getViewportDimension'),
        isDOMInViewport: require('./browser.isDOMInViewport'),
        wrapDOM: require('./browser.wrapDOM'),
        xmlToObject: require('./browser.xmlToObject'),
        xmlToString: require('./browser.xmlToString'),
        stringToXML: require('./browser.stringToXML'),
        stringToDOM: require('./browser.stringToDOM'),
        insertScript: require('./browser.insertScript'),
        insertStyle: require('./browser.insertStyle'),
        off: require('./browser.off'),
        on: require('./browser.on'),
        DropZone: require('./browser._DropZone'),
        Modal: require('./browser._Modal'),
        Swipe: require('./browser._Swipe'),
        lazyLoad: require('./browser._lazyLoad'),
        interactiveMD: require('./browser._interactiveMD'),
    })
    window.NativeUtils = NativeUtils
    window.runDefer = (delay = 1e3, retry = 0, maxRetry = 99, printRetry = 9, a = noop, i = noop) => {
        try {
            a = window.defer || []
            while (a.length) {
                i = a[a.length - 1]
                i = i && i()
                a.pop()
            }
        } catch (error) {
            if (retry >= maxRetry) {
                warn(`${String(retry).padStart(3)} > MAX`)
            }
            setTimeout(() => {
                window.runDefer(delay, ++retry, ((retry, error) => {
                    if (retry >= printRetry) {
                        warn(`${String(retry).padStart(3)} > ${error.stack}`)
                    }
                })(retry, error))
            }, delay)
        }
    }
    window.runDefer()
} catch (e) {
    noop(e)
}

module.exports = NativeUtils