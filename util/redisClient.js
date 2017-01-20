module.exports = (() => {
    let client;
    return function () {
        if (!client) {
            let config = require('./toolset').getConfig();
            client = require('redis').createClient(
                config.REDIS_PORT,
                config.REDIS_HOST
            );
        }
        return client;
    }
})();