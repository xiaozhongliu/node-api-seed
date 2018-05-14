/* ******************************************************************
 * fragmentary util functions are put here
 ****************************************************************** */
const crypto = require('crypto')

module.exports = {

    /**
     * md5 hash
     * @param   {string} target original string
     * @returns {string}
     */
    hash(target) {
        const md5 = crypto.createHash('md5')
        md5.update(target)
        return md5.digest('hex')
    },

    /**
     * hmac sign
     * @param   {string} target original string
     * @param   {string} key    encryption secret
     * @returns {string}
     */
    sign(target, key) {
        const hmac = crypto.createHmac('sha1', key)
        return hmac.update(target).digest().toString('base64')
    },
}
