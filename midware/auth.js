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
 * 不用身份验证的路径或文件
 * 根节点用来检查服务状态,跳过身份验证
 * @param url 请求url
 * @returns {boolean}
 */
function isNoAuthPath(url) {
    return config.NO_AUTH_PATHS.includes(url) || config.NO_AUTH_REG.test(url);
}

/**
 * 判断客户端和服务器hash的token是否匹配
 * @param token 客户端传来的token
 * @param stamp 客户端传来的时间戳
 * @returns {boolean}
 */
function checkToken(token, stamp) {
    return hash(config.REQUEST_TOKEN + stamp) == token;
}

/**
 * 通过时间戳判断是否是五分钟内的请求
 * @param stamp 客户端传来的时间戳
 * @returns {boolean}
 */
function checkStamp(stamp) {
    let current = new Date().getTime();
    let diffSecs = current - stamp;
    return Math.abs(diffSecs) < 300000;
}