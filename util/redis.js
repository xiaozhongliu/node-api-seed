/* ******************************************************************
 * redis client on the basis of node_redis
 ****************************************************************** */
const Redis = require('redis')
const { REDIS } = require('../config')

module.exports = Redis.createClient({
    host: REDIS.HOST,
    port: REDIS.PORT,
    retry_strategy(options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // end reconnecting on a specific error and flush all
            // commands with a individual error
            return new Error('The server refused the connection')
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // end reconnecting after a specific timeout and flush
            // all commands with a individual error
            return new Error('Retry time exhausted')
        }
        if (options.attempt > 10) {
            // end reconnecting with built in error
            return undefined
        }
        // reconnect after
        return Math.min(options.attempt * 100, 5000)
    }
})
