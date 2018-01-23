/* ******************************************************************
 * custom validators for express-validator. read more:
 * https://github.com/ctavan/express-validator#middleware-options
 ****************************************************************** */
module.exports = {

    isString(value) {
        return typeof value === 'string' || value instanceof String
    },

    isHash(value) {
        return /^[a-f0-9]{32}$/i.test(value)
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
}
