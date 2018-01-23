module.exports = {

    DEBUG: true,
    MAILER_ON: true,

    REDIS: {
        HOST: '127.0.0.1',
        PORT: 6379,
    },

    MONGO: 'mongodb://test:test@127.0.0.1/test',

    POSTGRES: {
        HOST: '127.0.0.1',
        BASE: 'test',
        USER: 'test',
        PASS: 'test',
    },
}
