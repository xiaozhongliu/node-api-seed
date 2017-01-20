module.exports = {

    NODE_ENV: 'test',

    //redis
    REDIS_HOST: '127.0.0.1',
    REDIS_PORT: 6379,

    REQUEST_TOKEN: 'b98891420f3b284cabb6777322da82ec',
    HASH_SECRECT: '!h@sh~$ECRET',

    //redis hashset key
    REDIS_SET_KEY: 'user',

    API_LOG_PATH: `${__dirname}/../log/`,
    TASK_LOG_PATH: `${__dirname}/../log/task/`,

    //no auth files or paths
    NO_AUTH_REG: /\.log$|\.ico$/,
    NO_AUTH_PATHS: [
        '/'
    ],

    //apply http auth on logs
    HTTP_AUTH: {
        username: 'admin',
        password: 'admin',
        itemsReg: /\.log$/,
    },
};