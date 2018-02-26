const noop = require('./noop')

/* globals Reflect */

/* try for a passive event */
let passiveEvent = false

try {
    document.body.addEventListener('test', null, Reflect.defineProperty({}, 'passive', {
        get: () => {
            return (passiveEvent = { passive: true }) || noop()
        }
    }))
} catch (e) {
    noop(e)
}

module.exports = passiveEvent