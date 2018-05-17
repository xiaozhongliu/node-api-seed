const { promisify } = require('util')
const { redis } = require('../util')

const set = promisify(redis.set).bind(redis)
const get = promisify(redis.get).bind(redis)
const del = promisify(redis.del).bind(redis)
const hset = promisify(redis.hset).bind(redis)
const hget = promisify(redis.hget).bind(redis)
const hdel = promisify(redis.hdel).bind(redis)

module.exports = {

    /**
     * set value of a key
     * @param {string} key      key
     * @param {string} value    value
     * @param {number} duration duration in seconds
     */
    async set(key, value, duration) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        if (duration) {
            return set(key, value, 'EX', duration)
        }
        return set(key, value)
    },

    /**
     * get value of a key
     * @param {string} key  key
     */
    async get(key) {
        const value = await get(key)
        try {
            return JSON.parse(value)
        } catch (e) {
            return value
        }
    },

    /**
     * delete a key
     * @param {string} key  key
     */
    async del(key) {
        return del(key)
    },

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
        return hset(key, field, value)
    },

    /**
     * get value of a hash field
     * @param {string} key      hash key
     * @param {string} field    field name
     */
    async hget(key, field) {
        const value = await hget(key, field)
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
        return hdel(key, field)
    },
}
