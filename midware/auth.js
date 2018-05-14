const config = require('../config')
const { jwtSvc } = require('../service')

module.exports = async (req, res, next) => {
    if (isNoAuthPath(req.path) || req.method === 'OPTIONS') {
        return next()
    }

    const { authorization } = req.headers
    if (!authorization) {
        return next(global.MessageErr('AuthFail'))
    }
    const jwt = authorization.substr(7)

    let payload
    try {
        payload = await jwtSvc.verify(jwt)
    } catch (e) {
        return next(global.MessageErr('AuthFail'))
    }
    if (!payload) {
        return next(global.MessageErr('AuthFail'))
    }

    req.auth = payload
    next()
}

/**
 * no auth files or paths
 * @param   {string} path    req url
 * @returns {boolean}
 */
function isNoAuthPath(path) {
    return config.NO_AUTH_PATHS.includes(path) || config.NO_AUTH_REG.test(path)
}
