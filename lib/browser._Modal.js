const noop = require('./noop')
const off = require('./browser.off')
const on = require('./browser.on')
const removeDOM = require('./browser.removeDOM')
const oneDOM = require('./browser.oneDOM')
const { body } = document

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
            removeDOM(oneDOM(`#${this.id}`))
        }
        this.close()
        dom.id = `${this.id}`
        dom.className = `Modal ${this.className}`
        dom.innerHTML = `${
            `<h1 id='${this.id}_Header' class='header'>${this.header}</h1>`
        }${
            `<div id='${this.id}_Body' class='body'><div>${this.body}</div></div>`
        }${
            `<button id='${this.id}_Close' class='close'>Close</button>`
        }`
        body.appendChild(dom)

        on(document, 'keydown', window.eKbd)
        on(oneDOM(`#${this.id}_Close`), 'click', () => {
            this.close(true)
        })
        this.callback()
    }
}

module.exports = Modal