/**
 * Wrap undefined in a function, useful for setting default value of callback
 * sometimes the callback argument is not a function, so when we invoke it,
 * prevent `Uncaught TypeError: callback is not a function`
 * or even deleting an object that already defined (memory-wise)
 * @returns {void}
 */
const noop = () => {}

module.exports = noop