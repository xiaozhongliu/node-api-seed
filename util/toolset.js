/* ******************************************************************
 * fragmentary util functions are put here
 ****************************************************************** */
const crypto = require('crypto')
const moment = require('moment')
const xml2js = require('xml2js')
const { promisify } = require('util')

moment.locale('zh-cn')
const builder = new xml2js.Builder()
const parser = new xml2js.Parser({ explicitArray: false, explicitRoot: false, trim: true })
const parseString = promisify(parser.parseString).bind(parser)

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

    /**
     * format a data object to string
     * @param {Date} date a Date object
     * @param {boolean} friendly return in friendly format
     */
    formatDate(date, friendly) {
        date = moment(date)
        if (friendly) {
            return date.fromNow()
        }
        return date.format('YYYY-MM-DD HH:mm')
    },

    /**
     * amend a caculated amount of money. e.g.:
     * 0.1 + 0.2 => 0.30000000000000004
     * toolset.amend(0.1 + 0.2) => 0.3
     * @param {*} amount
     * @param {*} precision
     */
    amend(amount, precision = 2) {
        const factor = Math.pow(10, precision)
        return Math.round(amount * factor) / factor
    },

    /**
     * parse object to xml string
     * @param {object} obj  original object
     */
    buildXml(obj) {
        return builder.buildObject(obj)
    },

    /**
     * parse xml string to object
     * @param {string} xml  original xml string
     */
    async parseXml(xml) {
        return parseString(xml)
    },
}
