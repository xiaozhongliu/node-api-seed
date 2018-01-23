const { redis } = require('../util')

module.exports = {

    /**
     * set the string value of a hash field
     * @param {string} key      hash key
     * @param {string} field    field name
     * @param {string} value    field value
     */
    hset(key, field, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        return new Promise((resolve, reject) => {
            redis.hset(key, field, value, err => {
                if (err) return reject(err)
                resolve()
            })
        })
    },

    /**
     * set the string value of a hash field
     * @param {string} key      hash key
     * @param {string} field    field name
     */
    hget(key, field) {
        return new Promise((resolve, reject) => {
            redis.hget(key, field, (err, val) => {
                if (err) return reject(err)
                try {
                    resolve(JSON.parse(val))
                } catch (e) {
                    resolve(val)
                }
            })
        })
    },

    /**
     * delete one or more hash fields
     * @param {string} key      hash key
     * @param {string|[string]} field   field name(s)
     */
    hdel(key, field) {
        return new Promise((resolve, reject) => {
            redis.hdel(key, field, err => {
                if (err) return reject(err)
                resolve()
            })
        })
    },

    /**
     * delete by key
     * @param {string} key  data key
     */
    del(key) {
        return new Promise((resolve, reject) => {
            redis.del(key, err => {
                if (err) return reject(err)
                resolve()
            })
        })
    },
}
