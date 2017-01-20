let {logger, config} = require('../util');

logger.info(`【 Service starts on http://localhost:${config.PORT} 】\n`);

module.exports = (req, res, next) => {

    if (isNoLogFile(req.url)) return next();

    let start = new Date();

    logger.info('Start ', req.method, `${req.protocol}://${req.get('host')}${req.url}`);
    if (req.method != 'GET') {
        logger.info('Data  ', JSON.stringify(req.body));
    }

    //给原生res.json方法增加一个记录日志的切面
    let original = res.json;
    res.json = function (json) {
        logger.info('Resp  ', JSON.stringify(json));
        return original.call(this, json);
    };

    res.on('finish', () => {
        let duration = new Date() - start;
        logger.info('Done  ', res.statusCode, `(${duration}ms)\n`);
    });

    next();
};

/**
 * 不用记录日志的文件
 * @param url 请求url
 * @returns {boolean}
 */
function isNoLogFile(url) {
    return config.NO_AUTH_REG.test(url);
}