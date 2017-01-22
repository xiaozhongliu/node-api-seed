let {config, hash} = require('../util');

module.exports = (req, res, next) => {
    if (isNoAuthPath(req.url)) {
        return next();
    }

    let token = req.header('token');
    let stamp = req.header('ts');

    if (!token || !stamp
        || !checkToken(token, stamp)
        || !checkStamp(stamp)) {
        return next(MessageErr('AuthFail'));
    }

    next();
};

/**
 * no auth files or paths
 * @param url: req url
 * @returns {boolean}
 */
function isNoAuthPath(url) {
    return config.NO_AUTH_PATHS.includes(url) || config.NO_AUTH_REG.test(url);
}

/**
 * check if the token hashed on server side matches the token from client
 * @param token: token from client
 * @param stamp: ts from client
 * @returns {boolean}
 */
function checkToken(token, stamp) {
    return hash(config.REQUEST_TOKEN + stamp) == token;
}

/**
 * check if the req is within 5m
 * @param stamp: ts from client
 * @returns {boolean}
 */
function checkStamp(stamp) {
    let current = new Date().getTime();
    let diffSecs = current - stamp;
    return Math.abs(diffSecs) < 300000;
}