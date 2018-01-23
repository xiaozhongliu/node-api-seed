const { hash } = require('../util')
const config = require('../config')

const HASHED_TOKEN = hash(config.REQUEST_TOKEN)

module.exports = (req, res, next) => {
    if (isNoAuthPath(req.path)) {
        return next()
    }

    const stamp = req.header('ts')
    const token = req.header('token')

    if (!token || !stamp || !checkToken(token, stamp)) {
        return next(global.MessageErr('AuthFail'))
    }

    next()
}

/**
 * no auth files or paths
 * @param   {string} url    req url
 * @returns {boolean}
 */
function isNoAuthPath(url) {
    return config.NO_AUTH_PATHS.includes(url) || config.NO_AUTH_REG.test(url)
}

/**
 * check if the token hashed on server side matches the token from client
 * @param   {string} token  token from client
 * @param   {string} stamp  ts from client
 * @returns {boolean}
 */
function checkToken(token, stamp) {
    return hash(HASHED_TOKEN + stamp) === token
}
