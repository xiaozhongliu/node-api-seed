const config = require('./config')
const cpuCount = require('os').cpus().length

console.log(`cpu count is: ${cpuCount}`)
const MAX_INS = cpuCount > 4 ? 4 : cpuCount

const isPrimary = process.env.IS_PRIMARY_ENDPOINT
console.log(`is primary endpoint: ${isPrimary || false}`)

const apps = [
    {
        name: config.API_NAME,
        script: './app.js',
        instances: process.argv[5] ? 1 : MAX_INS,
        exec_mode: 'cluster',
        out_file: './log/pm2/out.log',
        error_file: './log/pm2/error.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss ',
        combine_logs: true,
        env: {
            NODE_ENV: 'prod',
        },
        env_qa: {
            NODE_ENV: 'qa',
        },
        env_test: {
            NODE_ENV: 'test',
        },
        env_dev: {
            NODE_ENV: 'dev',
        },
    },
]

module.exports = { apps }
