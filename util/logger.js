/* ******************************************************************
 * file logger on the basis of log4js
 *
 * IMPORTANT: please install a module to work under pm2 cluster mode:
 * pm2 install pm2-intercom
 ****************************************************************** */
const fs = require('fs')
const log4js = require('log4js')
const config = require('../config')
const moment = require('moment')
require('moment/locale/zh-cn')

module.exports = logPath => {
    const layout = {
        type: 'pattern',
        pattern: '%x{time} - %m',
        tokens: {
            time() {
                return moment().format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }
    const appenders = {
        dateFile: {
            type: 'dateFile',
            category: 'APP',
            pattern: 'yyyyMMdd.log',
            alwaysIncludePattern: true,
            filename: logPath,
            layout
        }
    }
    const categories = {
        default: { appenders: ['dateFile'], level: 'info' }
    }

    // no prod logs also output to onsole
    if (config.DEBUG) {
        appenders.console = { type: 'console', layout }
        categories.default.appenders.push('console')
    }

    // create the log path if it doesn't exist
    fs.existsSync(logPath) || fs.mkdirSync(logPath)

    log4js.configure({
        appenders,
        categories,
        pm2: true,
    })

    return log4js.getLogger('APP')
}
