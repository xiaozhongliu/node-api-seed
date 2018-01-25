const { promisify } = require('util')
const { redis } = require('../util')

module.exports = {

    /**
     * set value of a hash field
     * @param {string} key      hash key
     * @param {string} field    field name
     * @param {string} value    field value
     */
    async hset(key, field, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        return promisify(redis.hset)(key, field, value)
    },

    /**
     * get value of a hash field
     * @param {string} key      hash key
     * @param {string} field    field name
     */
    async hget(key, field) {
        const value = await promisify(redis.hget)(key, field)
        try {
            return JSON.parse(value)
        } catch (e) {
            return value
        }
    },

    /**
     * delete one or more hash fields
     * @param {string} key      hash key
     * @param {string|[string]} field   field name(s)
     */
    async hdel(key, field) {
        return promisify(redis.hdel)(key, field)
    },

    /**
     * delete by key
     * @param {string} key  data key
     */
    async del(key) {
        return promisify(redis.del)(key)
    },
}
