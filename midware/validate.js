let config = require('../util').config;
let validate = require('../util').validhelper;

module.exports = {
    /**
     * validation midware on common params which exist in every inteface
     */
    common(req, res, next) {
        //no auth files or paths
        if (config.NO_AUTH_PATHS.includes(req.url) || config.NO_AUTH_REG.test(req.url)) {
            return next();
        }

        validate.assertEmptyFromHeader(req, ['token', 'ts']);
        validate.assertEmptyOne(req, 'username', Message('UsernameEmpty').code);
        handleValidationResult(req, next);
    },

    /**
     * specific validation on interface: login
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