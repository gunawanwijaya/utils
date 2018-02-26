const noop = require('./noop')

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

module.exports = DropZone