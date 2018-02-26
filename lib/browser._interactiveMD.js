const noop = require('./noop')

const on = require('./browser.on')
const allDOM = require('./browser.allDOM')
const oneDOM = require('./browser.oneDOM')
const wrapDOM = require('./browser.wrapDOM')
const stringToDOM = require('./browser.stringToDOM')
const hasClass = require('./browser.hasClass')
const addClass = require('./browser.addClass')
const removeClass = require('./browser.removeClass')

const Modal = require('./browser._Modal')
const lazyLoad = require('./browser._lazyLoad')

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
                            tmp = allDOM('tr', d)
                            addClass(tmp, 'row')
                            tmp = allDOM('td,th', d)
                            addClass(tmp, `col-sm-1 col-md-1-${tmp[0].parentNode.children.length}`)
                            tmp = oneDOM('thead', d)
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
                    d.parentNode.replaceChild(stringToDOM(`${
                        `<span class='${className}'><iframe src='${src}${ytsrc}' ${attr}></iframe></span>`
                    }`), d)

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
        el = allDOM('body [title]')
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

module.exports = interactiveMD