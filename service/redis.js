let {config, redis} = require('../util');

module.exports = {

    /**
     * set value
     * @param key
     * @param val
     */
    saveAccessToken(key, val) {
        return new Promise((resolve, reject) => {
            redis.hset(
                config.REDIS_SET_KEY,
                key,
                JSON.stringify({
                    val: val,
                    created: new Date().getTime()
                }),
                (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                }
            );
        });
    },

    /**
     * get value
     * @param key
     */
    getAccessToken(key){
        return new Promise((resolve, reject) => {
            redis.hget(config.REDIS_SET_KEY, key, (err, val) => {
                if (err) {
                    return reject(err);
                }
                try {
                    resolve(JSON.parse(val));
                } catch (e) {
                    reject(e);
                }
            });
        });
    },
};