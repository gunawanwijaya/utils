/* eslint no-unused-vars: 0 */
/** @returns {*} utils */
const utils = () => {
    let tmp = 0

    try {
        tmp = document
    } catch (e) {
        tmp = {}
    }
    const { documentElement: html = 0, head = 0, body = 0 } = tmp
    const { log, warn } = console


    /**
     * Wrap undefined in a function, useful for setting default value of callback
     * sometimes the callback argument is not a function, so when we invoke it,
     * prevent `Uncaught TypeError: callback is not a function`
     * or even deleting an object that already defined (memory-wise)
     * @returns {void}
     */
    const noop = () => {}


    /**
     * Parse from String to a native type
     * @param {String} str String to evaluate
     * @returns {*} Native Object
     */
    const val = (str) => {
        try {
            return JSON.parse(str)
        } catch (error) {
            return str
        }
    }


    /**
     * Get a type of an object
     * @param {*} obj Object to check
     * @returns {String} Result
     */
    const getType = (obj) => {
        try {
            return obj.constructor
        } catch (error) {
            return noop()
        }
    }


    /**
     * Type checking an object
     * @param {*} obj Object to check
     * @param {*} type Type to evaluate
     * @returns {Boolean} Result
     */
    const is = (obj, type) => getType(obj) === type


    /**
     * Looping a callback function with one argument of String
     * @param {String | Array<String>} str String or Array<String> to evaluate
     * @param {Function} fn Callback function with one argument of String
     * @param {String} delimiter Use to split a String
     * @returns {void}
     */
    const eachText = (str, fn, delimiter = ' ') => {
        if (str && fn) {
            str = is(str, String) ? str.split(delimiter) : str
            str.forEach((i) => i && fn(i))
        }
    }


    /**
     * Deep merge two or more Object, set `a` as `{}` to preserve immutable
     * @param {Object} a Mutated Object
     * @param {Object|Array<Object>} b Object / Array of Object
     * @returns {Object} Merged Object
     */
    const merge = (a, b) => {
        b = is(b, Object) ? [b] : b
        if (!a || !b) {
            throw new Error('MergeError')
        }
        b.forEach((c) => {
            Object.keys(c).forEach((p) => {
                a[p] = is(c[p], Object)
                    ? merge(Object.assign({}, a[p]), c[p])
                    : c[p]
            })
        })

        return a
    }


    /**
     * QueryString-ified version of an object
     * @param {*} obj Source object to QueryString-ified
     * @param {*} ptr Recursive pointer
     * @returns {String} QueryString
     */
    const objectToQueryString = (obj, ptr) => {
        return Object.keys(obj)
            .map((key) => {
                const tmp = ptr ? `${ptr}[${key}]` : key

                obj[key] = is(obj[key], Array) ? `[${obj[key]}]` : obj[key]

                return is(obj[key], Object) ? objectToQueryString(obj[key], tmp) : `${tmp}=${obj[key]}`
            })
            .join('&')
    }


    /**
     * Parse QueryString to an Object
     * @param {String} str QueryString
     * @returns {*} Object
     */
    const queryStringToObject = (str) => {
        str = str || (window && window.location.search.substr(1))

        return is(str, String) && str.split('&')
            .map((v) => v.split('='))
            .reduce((obj, [k, v]) => {
                v = is(val(v), String) ? `"${v}"` : v
                k = k && v ? k
                    .split(/\[|\]/g)
                    .filter((k) => k)
                    .reverse()
                    .reduce((acc, curr) => `{"${curr}":${acc || v}}`, '') : {}

                return merge(obj, val(k))
            }, {})
    }


    /** @returns {*} browser utils */
    const browser = () => {

        /* try for a passive event */ // eslint-disable-next-line
        let _psv = false; try { body.addEventListener('test', null, Object.defineProperty({}, 'passive', { get: () => { _psv = {passive: true};} }));} catch (e) {}

        /**
         * HTMLElement.querySelector wrapper
         * @param {String} q Standard CSS selector
         * @param {HTMLElement} dom Single HTMLElement / reference
         * @returns {HTMLElement} Single HTMLElement
         */
        const one = (q, dom = document) => dom.querySelector(q)


        /**
         * HTMLElement.querySelectorAll wrapper to return an Array of HTMLElement instead of NodeList
         * @param {String} q Standard CSS selector
         * @param {HTMLElement} dom Single HTMLElement / reference
         * @returns {Array<HTMLElement>} Array of HTMLElement
         */
        const all = (q, dom = document) => [...dom.querySelectorAll(q)]

        /**
         * Remove single HTMLElement / reference
         * @param {HTMLElement} dom Single HTMLElement / reference
         * @returns {void}
         */
        const rm = (dom) => dom && dom.parentNode.removeChild(dom)


        /**
         * Looping a callback function with one argument of HTMLElement
         * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
         * CSS selector / Array of HTMLElement / NodeList
         * @param {Function} fn Callback function with one argument of HTMLElement
         * @returns {void}
         */
        const eachNode = (dom, fn) => {
            if (dom && fn) {
                if (is(dom, Array)) {
                    tmp = dom
                } else
                if (is(dom, String)) {
                    tmp = all(dom)
                } else
                if (is(dom, HTMLElement) || window) {
                    tmp = [dom]
                } else
                if (is(dom, NodeList)) {
                    tmp = [...dom]
                }
                tmp.forEach((i) => i && fn(i))
            }
        }


        /**
         * Looping callback function with two argument of HTMLElement & String
         * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
         * CSS selector / Array of HTMLElement / NodeList
         * @param {String | Array<String>} str String or Array<String> to evaluate
         * @param {Function} fn Callback function with two argument of HTMLElement & String
         * @returns {void}
         */
        const eachNodeAndText = (dom, str, fn) => {
            if (dom && str && fn) {
                eachNode(dom, (A) => eachText(str, (B) => A && B && fn(A, B)))
            }
        }


        /**
         * Is an element have a specific className
         * @param {HTMLElement} dom Single HTMLElement
         * @param {String} str String to compare against the className
         * @returns {Boolean} Result
         */
        const hasClass = (dom, str) => new RegExp(` ${str} `).test(` ${dom.className} `)


        /**
         * Add a className to HTMLElement
         * @param {HTMLElement} dom Single HTMLElement
         * @param {String} str String to add to the className
         * @returns {void}
         */
        const addClass = (dom, str) => {
            eachNodeAndText(dom, str, (f, u) => {
                tmp = f.classList ? f.classList.add(u) : f.className += ` ${u}`
            })
        }


        /**
         * Remove a className to HTMLElement
         * @param {HTMLElement} dom Single HTMLElement
         * @param {String} str String to remove to the className
         * @returns {void}
         */
        const removeClass = (dom, str) => {
            eachNodeAndText(dom, str, (f, u) => {
                tmp = f.classList ? f.classList.remove(u) : f.className = f.className.split(u).join('')
            })
        }


        /**
         * Toggle a className to HTMLElement
         * @param {HTMLElement} dom Single HTMLElement
         * @param {String} str String to evaluate against the className
         * @returns {void}
         */
        const toggleClass = (dom, str) => {
            eachNodeAndText(dom, str, (f, u) => {
                tmp = hasClass(f, u) ? removeClass(f, u) : addClass(f, u)
            })
        }


        /**
         * Get scroll position
         * @returns {*} Scroll position
         */
        const getScroll = () => ({
            x: window.scrollX || window.scrollLeft || 0,
            y: window.scrollY || window.scrollTop || 0,
        })


        /**
         * Get viewport dimension
         * @returns {*} Viewport dimension
         */
        const getViewport = () => ({
            w: window.innerWidth || html.clientWidth || body.clientWidth || 0,
            h: window.innerHeight || html.clientHeight || body.clientHeight || 0,
        })


        /**
         * Check if the given HTMLElement is visible in viewport
         * @param {HTMLElement} dom Single HTMLElement
         * @returns {Boolean} Result
         */
        const isElementInViewport = (dom) => (tmp = dom.getBoundingClientRect()) &&
            tmp.top >= 0 && tmp.left >= 0 && tmp.right <= getViewport().w && tmp.bottom <= getViewport().h


        /**
         * Wrap a dom in a newly created HTMLElement
         * @param {HTMLElement} dom Single HTMLElement
         * @param {HTMLElement} x newly created HTMLElement
         * @returns {void}
         */
        const wrapDOM = (dom, x) => dom.parentNode.insertBefore(x, dom) && x.appendChild(dom)


        /** # modified to es6 method from https://github.com/metatribal/xmlToObject */ // eslint-disable-next-line
        const xmlToObject=function(){this.version="1.3.4";var e={mergeCDATA:!0,grokAttr:!0,grokText:!0,normalize:!0,xmlns:!0,namespaceKey:"_ns",textKey:"_text",valueKey:"_value",attrKey:"_attr",cdataKey:"_cdata",attrsAsObject:!0,stripAttrPrefix:!0,stripElemPrefix:!0,childrenAsArray:!0},t=new RegExp(/(?!xmlns)^.*:/),r=new RegExp(/^\s+|\s+$/g);return this.grokType=function(e){return/^\s*$/.test(e)?null:/^(?:true|false)$/i.test(e)?"true"===e.toLowerCase():isFinite(e)?parseFloat(e):e},this.parseString=function(e,t){return this.parseXML(this.stringToXML(e),t)},this.parseXML=function(a,n){for(var s in n)e[s]=n[s];var l={},i=0,o="";if(e.xmlns&&a.namespaceURI&&(l[e.namespaceKey]=a.namespaceURI),a.attributes&&a.attributes.length>0){for(var c={};i<a.attributes.length;i++){var u=a.attributes.item(i);m={};var p;p=e.stripAttrPrefix?u.name.replace(t,""):u.name,e.grokAttr?m[e.valueKey]=this.grokType(u.value.replace(r,"")):m[e.valueKey]=u.value.replace(r,""),e.xmlns&&u.namespaceURI&&(m[e.namespaceKey]=u.namespaceURI),e.attrsAsObject?c[p]=m:l[e.attrKey+p]=m}e.attrsAsObject&&(l[e.attrKey]=c)}if(a.hasChildNodes())for(var y,d,m,h=0;h<a.childNodes.length;h++)4===(y=a.childNodes.item(h)).nodeType?e.mergeCDATA?o+=y.nodeValue:l.hasOwnProperty(e.cdataKey)?(l[e.cdataKey].constructor!==Array&&(l[e.cdataKey]=[l[e.cdataKey]]),l[e.cdataKey].push(y.nodeValue)):e.childrenAsArray?(l[e.cdataKey]=[],l[e.cdataKey].push(y.nodeValue)):l[e.cdataKey]=y.nodeValue:3===y.nodeType?o+=y.nodeValue:1===y.nodeType&&(0===i&&(l={}),d=e.stripElemPrefix?y.nodeName.replace(t,""):y.nodeName,m=xmlToObject.parseXML(y),l.hasOwnProperty(d)?(l[d].constructor!==Array&&(l[d]=[l[d]]),l[d].push(m)):(e.childrenAsArray?(l[d]=[],l[d].push(m)):l[d]=m,i++));else o||(e.childrenAsArray?(l[e.textKey]=[],l[e.textKey].push(null)):l[e.textKey]=null);if(o)if(e.grokText){var x=this.grokType(o.replace(r,""));null!=x&&(l[e.textKey]=x)}else e.normalize?l[e.textKey]=o.replace(r,"").replace(/\s+/g," "):l[e.textKey]=o.replace(r,"");return l},this.xmlToString=function(e){try{return e.xml?e.xml:(new XMLSerializer).serializeToString(e)}catch(e){return null}},this.stringToXML=function(e){try{var t=null;return window.DOMParser?t=(new DOMParser).parseFromString(e,"text/xml"):((t=new ActiveXObject("Microsoft.XMLDOM")).async=!1,t.loadXML(e),t)}catch(e){return null}},this}.call({});"undefined"!=typeof module&&null!==module&&module.exports?module.exports=xmlToObject:"function"==typeof define&&define.amd&&define(function(){return xmlToObject});


        /**
         * Create XML String representation from XML Element
         * @param {HTMLElement} xml XML Element
         * @returns {String} XML String
         */
        const xmlToString = (xml) => xml.xml || new XMLSerializer().serializeToString(xml)


        /**
         * Create XML Element representation from XML String
         * @param {String} str XML String
         * @returns {HTMLElement} XML Element
         */
        const stringToXML = (str) => new DOMParser().parseFromString(str, 'text/xml')


        /**
         * Make a valid HTMLElement from a string
         * @param {String} str A valid HTML syntax string
         * @returns {HTMLElement} Single HTMLElement
         */
        const stringToDOM = (str) => (tmp = document.createElement('div')) && (tmp.innerHTML = str) && tmp.firstChild


        /**
         * Make a JSONP-like request to a remote URL
         * @param {String} src URL representative of external js file
         * @returns {void}
         */
        const jsonp = (src) => {
            const dom = document.createElement('script')

            head.appendChild(dom)
            dom.src = src
            dom.parentNode.removeChild(dom)
        }

        /**
         * Add new css style via <style>
         * @param {String} css Valid CSS syntax string
         * @returns {void}
         */
        const addCSS = (css) => {
            const dom = document.createElement('style')

            head.appendChild(dom)
            dom.appendChild(document.createTextNode(css))
        }


        /**
         * Remove event listener
         * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
         * CSS selector / Array of HTMLElement / NodeList
         * @param {String} evt String of event that will be removed
         * @param {Function} fn Callback function
         * @param {Boolean} psv Event passiveness, default to true in modern browser
         * @returns {void}
         */
        const off = (dom, evt, fn, psv = _psv) => {
            eachNodeAndText(dom, evt, (f, u) => {
                tmp = f.removeEventListener ? f.removeEventListener(u, fn, psv) : noop()
                tmp = f.detachEvent ? f.detachEvent(`on${u}`, fn) : noop()
            })
        }


        /**
         * Add event listener
         * @param {String | HTMLElement | Array<HTMLElement> | NodeList} dom Any HTMLElement reference,
         * CSS selector / Array of HTMLElement / NodeList
         * @param {String} evt String of event that will be added
         * @param {Function} fn Callback function
         * @param {Boolean} psv Event passiveness, default to true in modern browser
         * @returns {void}
         */
        const on = (dom, evt, fn, psv = _psv) => {
            eachNodeAndText(dom, evt, (f, u) => {
                tmp = f.addEventListener ? f.addEventListener(u, fn, psv) : noop()
                tmp = f.attachEvent ? f.attachEvent(`on${u}`, fn) : noop()
            })
        }


        return {
            one,
            all,
            rm,
            eachNode,
            eachNodeAndText,
            hasClass,
            addClass,
            removeClass,
            toggleClass,
            getScroll,
            getViewport,
            isElementInViewport,
            wrapDOM,
            xmlToObject,
            xmlToString,
            stringToXML,
            stringToDOM,
            jsonp,
            addCSS,
            off,
            on,
        }
    }


    /** @returns {*} browser libs */
    const library = () => {
        const {
            one,
            all,
            rm,
            stringToDOM,
            wrapDOM,
            isElementInViewport,
            hasClass,
            addClass,
            removeClass,
            off,
            on,
        } = browser()


        const DropZone = class DropZone {
            constructor (ctrl, face) {
                this.files = []
                this.ctrl = ctrl
                this.face = face


                /**
                 * @param {*} F File
                 * @param {Function} omega Callback
                 * @returns {void}
                 */
                const isDone = (F, omega) => {
                    if (F.dataTXT && F.dataB64) {
                        this.files.push(F)
                        omega(F)
                    }
                }

                /**
                 * @param {*} F File
                 * @param {Function} alpha Callback
                 * @param {Function} omega Callback
                 * @returns {void}
                 */
                const readFile = (F, alpha = noop, omega = noop) => {
                    let r = 0

                    if (alpha(F, this.files) !== false) {
                        r = new FileReader()
                        r.onload = ((F) => {
                            return (D) => {
                                F.dataTXT = D.target.result
                                isDone(F, omega)
                            }
                        })(F)
                        r.readAsText(F)
                        r = new FileReader()
                        r.onload = ((F) => {
                            return (D) => {
                                F.dataB64 = D.target.result
                                isDone(F, omega)
                            }
                        })(F)
                        r.readAsDataURL(F)
                    }
                }

                this.fileHandler = (e, alpha, omega) => {
                    if (e.type === 'dragend') {
                        e.dataTransfer.clearData()
                    } else
                    if (e.type === 'drop') {
                        [...e.dataTransfer.files].forEach((file) => {
                            readFile(file, alpha, omega)
                        })
                    } else
                    if (e.type === 'change') {
                        [...e.target.files].forEach((file) => {
                            readFile(file, alpha, omega)
                        })
                        e.target.value = ''
                    }
                }
            }
        }

        const Modal = class Modal {
            constructor (opts = {}, onClose = noop, callback = noop) {
                window.eKbd = (e) => {
                    if (e.keyCode === 27) {
                        this.close(true)
                    }
                }
                const dom = document.createElement('div')

                this.id = opts.id || `Modal_${new Date().getTime()}`
                this.className = opts.className || ''
                this.header = opts.header || 'Header'
                this.body = opts.body || 'Body goes here'
                this.onClose = opts.onClose || onClose
                this.callback = opts.callback || callback
                this.close = (hasRun = false) => {
                    if (hasRun && (this.onClose === false || this.onClose() === false)) {
                        return
                    }
                    off(document, 'keydown', window.eKbd)
                    window.eKbd = noop()
                    rm(one(`#${this.id}`))
                }
                this.close()
                dom.id = `${this.id}`
                dom.className = `Modal ${this.className}`
                dom.innerHTML = `
                <h1 id='${this.id}_Header' class='header'>${this.header}</h1>
                    <div id='${this.id}_Body' class='body'>
                        <div>${this.body}</div>
                    </div>
                <button id='${this.id}_Close' class='close'>Close</button>
                `
                body.appendChild(dom)

                on(document, 'keydown', window.eKbd)
                on(one(`#${this.id}_Close`), 'click', () => {
                    this.close(true)
                })
                this.callback()
            }
        }

        const Swipe = class Swipe {
            run (e, opts) {

                /**
                 * @param {Event} e e
                 * @returns {void} */
                const alpha = (e) => {
                    const { touches: [{ clientX, clientY }] } = e

                    this.xA = clientX
                    this.yA = clientY
                }

                /**
                 * @param {Event} e e
                 * @returns {void} */
                const omega = (e) => {
                    const { touches: [{ clientX, clientY }] } = e

                    if (this.xA && this.yA) {
                        let xB = this.xA - clientX,
                            yB = this.yA - clientY

                        if (Math.abs(xB) < Math.abs(yB)) {
                            yB = yB > 0 ? this.onUp() : this.onDown()
                        } else {
                            xB = xB > 0 ? this.onLeft() : this.onRight()
                        }
                        this.xA = noop()
                        this.yA = noop()
                    }
                }

                this.onUp = opts.onUp || noop
                this.onDown = opts.onDown || noop
                this.onLeft = opts.onLeft || noop
                this.onRight = opts.onRight || noop
                e = e && e.type === 'touchstart' ? alpha(e) : e
                e = e && e.type === 'touchmove' ? omega(e) : e
            }
        }

        /**
         * Remove lazyload class name from .lazyload & inject src into it
         * @param {HTMLElement} dom HTMLElement
         * @param {*} str className
         * @returns {void}
         */
        const lazyLoad = (dom = 'img.lazyload', str = 'lazyload') => {
            all(dom).forEach((img) => {
                if (isElementInViewport(img) && img.dataset.src && img.src.indexOf('data:image') === 0) {
                    img.src = img.dataset.src
                    img.dataset.src = noop()
                    removeClass(img, str)
                }
            })
        }


        /* eslint prefer-arrow-callback:0 */
        /** @returns {void} */
        const interactiveMD = () => {
            const cmd = {
                    find: (d, j) => {
                        const tag = (j.tag || '').trim().toUpperCase(),
                            className = j.className || ''
                        let loop = true,
                            tmp = 0

                        d.tabIndex = -1
                        while (loop && (d = d.parentNode)) {
                            if (d.tagName === tag) {
                                loop = false
                                addClass(d, className)
                                if (tag === 'TABLE' && hasClass(d, 'responsive')) {
                                    tmp = all('tr', d)
                                    addClass(tmp, 'row')
                                    tmp = all('td,th', d)
                                    addClass(tmp, `col-sm-1 col-md-1-${tmp[0].parentNode.children.length}`)
                                    tmp = one('thead', d)
                                    addClass(tmp, 'hide')
                                }
                            }
                        }
                    },
                    wrap: (d, j) => {
                        const tag = (j.tag || '').trim().toUpperCase(),
                            className = j.className || '',
                            attr = j.attr || '',
                            figcaption = j.figcaption || d.alt || d.title || '',
                            wrapper = tag.length ? stringToDOM(`<${tag} ${attr}></${tag}>`) : d

                        addClass(wrapper, className)
                        if (wrapper !== d) {
                            wrapDOM(d, wrapper)
                            if (tag === 'FIGURE' && figcaption.length) {
                                wrapper.appendChild(stringToDOM(`<figcaption ${attr}>${figcaption}</figcaption>`))
                            }
                        }
                    },
                    audio: (d, j) => {
                        const src = j.src || d.src || d.href || '',
                            attr = j.attr || '',
                            audio = stringToDOM(`<audio src='${src}' ${attr}></audio>`)

                        d.parentNode.insertBefore(audio, d)
                        on(d, 'click', (e) => {
                            e.preventDefault()
                            e = audio.paused ? audio.play() : audio.pause()

                            return false
                        }, false)
                    },
                    embed: (d, j) => {
                        const src = j.src || d.src || d.href || '',
                            className = j.className || 'embed ratio ratio-16-9',
                            attr = j.attr || 'allowfullscreen frameborder="0"',
                            ytsrc = src.toLowerCase().indexOf('youtube') >= 0 && src.indexOf('?') < 0
                                ? '?&autoplay=1&iv_load_policy=3&modestbranding=1&showinfo=0&rel=0&playsinline=1'
                                : ''

                        addClass(d, className)
                        on(d, 'click', (e) => {
                            e.preventDefault()
                            removeClass(d, 'embed')
                            d.parentNode.replaceChild(stringToDOM(`<span class='${className}'>
                                <iframe src='${src}${ytsrc}' ${attr}></iframe>
                            </span>`), d)

                            return false
                        }, false)
                    },
                    modal: (d, j) => {
                        const src = j.src || d.src || d.href || '',
                            body = j.body || d.innerHTML || 'Body',
                            header = j.header || 'Header',
                            className = j.className || ''

                        on(d, 'click', (e) => {
                            e.preventDefault()
                            e = new Modal({
                                'body': `${body}`,
                                'header': `<a target='_blank' href='${src}'>${header}</a>`,
                                'className': `${className}`,
                            })
                            lazyLoad()

                            return false
                        }, false)
                    },
                },
                el = all('body [title]')
            let i = el.length,
                j = noop,
                t = noop()

            while (i--) {
                try {
                    t = JSON.parse(el[i].title)
                    t = t.pop ? t : [t]
                } catch (error) {
                    noop(error)
                }
                while (t.length && (j = t.pop())) {
                    cmd[j['>']](el[i], j);
                    (el[i] || {}).title = ''
                }
            }
        }


        return {
            DropZone,
            Modal,
            Swipe,
            lazyLoad,
            interactiveMD
        }
    }

    try {
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
        noop()
    }

    return merge({
        noop,
        val,
        getType,
        is,
        eachText,
        merge,
        objectToQueryString,
        queryStringToObject,
    }, typeof window === noop() ? {} : [browser(), library()])
}

const NativeUtils = utils()

if (typeof module === 'undefined') {
    NativeUtils.merge(window, { NativeUtils })
} else {
    module.exports = NativeUtils
}