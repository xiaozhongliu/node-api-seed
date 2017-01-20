module.exports = {

    NODE_ENV: 'test',

    //redis
    REDIS_HOST: '127.0.0.1',
    REDIS_PORT: 6379,

    TOKEN_HUDONG: '700da4d8ef5c07e7dc7ed4e250cc15ab',
    HASH_SECRECT: '!p@ssw0rd-t0ken~$ECRET',

    //redis hashset key
    REDIS_SET_KEY: 'user',

    API_LOG_PATH: `${__dirname}/../log/`,
    TASK_LOG_PATH: `${__dirname}/../log/task/`,

    //no auth files or paths
    NO_AUTH_REG: /\.log|\.ico/,
    NO_AUTH_PATHS: [
        '/',
        '/login',
        '/register'
    ],

    //apply http auth on logs
    HTTP_AUTH: {
        username: 'admin',
        password: 'admin',
        itemsReg: /\.log$/,
    },
};