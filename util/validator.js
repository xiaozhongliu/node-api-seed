/* ******************************************************************
 * custom validators for express-validator. read more here:
 * https://github.com/ctavan/express-validator#middleware-options
 ****************************************************************** */
module.exports = {

    isString(value) {
        return typeof value === 'string' || value instanceof String
    },

    isHash(value) {
        return /^[a-f0-9]{32}$/i.test(value)
    },

    isPhone(value) {
        return /^1[3|4|5|8|7][0-9]\d{8}$/.test(value)
    },

    isStamp(value) {
        return /^[0-9]{13}$/.test(value)
    },

    isUnixStamp(value) {
        return /^[0-9]{10}$/.test(value)
    },

    isStringArray(value) {
        if (!Array.isArray(value)) return false
        for (const item of value) {
            if (!this.isString(item)) return false
        }
        return true
    },

    isIdCardNO(value) {
        return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(value)
    },
}
