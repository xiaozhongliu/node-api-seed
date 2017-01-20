let config = require('../util').config;
let validate = require('../util').validhelper;

module.exports = {
    /**
     * 通用请求参数验证中间件(针对公用参数的验证)
     */
    common(req, res, next) {
        //不用校验参数的路径或文件
        if (config.NO_AUTH_PATHS.includes(req.url) || config.NO_AUTH_REG.test(req.url)) {
            return next();
        }

        validate.assertEmptyFromHeader(req, ['token', 'ts']);
        validate.assertEmptyOne(req, 'username', Message('UsernameEmpty').code);
        handleValidationResult(req, next);
    },

    /**
     * 接口验证中间件: login
     */
    login(req, res, next) {
        validate.assertEmptyOne(req, 'password', Message('PasswordEmpty').code);
        handleValidationResult(req, next);
    },
};

function handleValidationResult(req, next) {
    req.getValidationResult().then(result => {
        if (!result.isEmpty()) {
            let arr = result.array()[0].msg.split('@@');
            let err = new Error(arr[1]);
            err.code = parseInt(arr[0]);
            return next(err);
        }
        next();
    });
}