module.exports = {

    APP_NAME: 'node-api-seed',
    API_PORT: 8001,

    // security
    REQUEST_TOKEN: 'yMtpwu44Mf',
    HASH_SECRET: 'vmHOX8ALwx',
    JWT_SECRET: 's!v^%W.Y80Mp$g$',

    // no auth stuffs
    NO_AUTH_REG: /\.log$|\.ico$|^\/socket.io/,
    NO_AUTH_PATHS: [
        '/',
        '/monitor',
        '/login',
        '/register',
    ],

    // logs location
    API_LOG_PATH: `${__dirname}/../log/`,
    TASK_LOG_PATH: `${__dirname}/../log/task/`,

    // http auth on logs
    HTTP_AUTH: {
        USERNAME: 'viewer',
        PASSWORD: '1234Abcd',
        ITEMS_REG: /\.log$|^\/dashboard/,
    },

    // mailer related params
    MAILER: {
        HOST: 'smtp.test.com',
        PORT: 25,
        USER: 'test@test.com',
        PASS: 'test',
        NICK_NAME: 'Service Alarm',
        RECEIVERS: [
            'test@test.com',
        ],
    },
}
