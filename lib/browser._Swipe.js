const noop = require('./noop')

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

module.exports = Swipe