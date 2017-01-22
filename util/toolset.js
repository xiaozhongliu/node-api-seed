let crypto = require('crypto');

module.exports = {

    _config: null,

    /**
     * generate config by the env param
     * @returns {*}
     */
    getConfig() {
        if (!this._config) {
            try {
                this._config = require('../config/common');
                let custom_config = require(`../config/${this._config.NODE_ENV}`);
                Object.assign(this._config, custom_config);
            } catch (e) {
                console.log('Please make sure environment variable NODE_ENV is set.');
                process.exit();
            }
        }
        return this._config;
    },

    /**
     * md5 hash
     * @param target: original string
     * @returns {*}
     */
    hash(target) {
        let md5 = crypto.createHash('md5');
        md5.update(target);
        return md5.digest('hex');
    },

    /**
     * hmac sign
     * @param target: original string
     * @param key:    encryption secret
     * @returns {string|String|*}
     */
    sign(target, key) {
        let hmac = crypto.createHmac('sha1', key);
        return hmac.update(target).digest().toString('base64');
    },
};