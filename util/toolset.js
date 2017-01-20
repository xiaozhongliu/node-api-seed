let crypto = require('crypto');

module.exports = {

    _config: null,

    /**
     * 根据命令行环境参数获取相应配置
     * @returns {*}
     */
    getConfig() {
        if (!this._config) {
            try {
                this._config = require('../config/common');
                let custom_config = require(`../config/${this._config.NODE_ENV}`);
                Object.assign(this._config, custom_config);
            } catch (e) {
                console.log('Please make sure environment variable NODE_ENV is set.' );
                process.exit();
            }
        }
        return this._config;
    },

    /**
     * md5 hash
     * @param target 原始字符串
     * @returns {*}
     */
    hash(target) {
        let md5 = crypto.createHash('md5');
        md5.update(target);
        return md5.digest('hex');
    },

    /**
     * hmac sign
     * @param target 原始字符串
     * @param key    加密密钥
     * @returns {string|String|*}
     */
    sign(target, key) {
        let hmac = crypto.createHmac('sha1', key);
        return hmac.update(target).digest().toString('base64');
    },
};