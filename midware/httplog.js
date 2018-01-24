const express = require('express')
const shortid = require('shortid')
const config = require('../config')
const logger = require('../util').logger(config.API_LOG_PATH)

// add a logging aspect to the primary res.json function
const origin = express.response.json
express.response.json = function (json) {
    logger.info(`[${this.reqId}] Resp  `, JSON.stringify(json))
    return origin.call(this, json)
}

logger.info(`service starts at http://localhost:${config.API_PORT}\n`)

module.exports = (req, res, next) => {
    if (isNoLogFile(req.url) || req.method === 'OPTIONS') {
        return next()
    }

    res.start = new Date()
    res.reqId = shortid.generate()

    logger.info(`[${res.reqId}] Start `, req.method, req.url)
    if (req.method !== 'GET') {
        logger.info(`[${res.reqId}] Data  `, JSON.stringify(req.body))
    }

    res.on('finish', function () {
        const duration = new Date() - this.start
        logger.info(`[${this.reqId}] Done  `, this.statusCode, `(${duration}ms)\n`)
    })

    next()
}

/**
 * no log files or paths
 * @param   {string} url    req url
 * @returns {boolean}
 */
function isNoLogFile(url) {
    return config.NO_AUTH_REG.test(url)
}
