let fs = require('fs');
let log4js = require('log4js');
let config = require('./toolset').getConfig();

let appenders = [{
    type: 'dateFile',
    category: 'SITE',
    filename: `${config.API_LOG_PATH}`,
    pattern: 'yyyyMMdd.log',
    alwaysIncludePattern: true,
    layout: {
        type: 'pattern',
        pattern: '%d{ISO8601} [%c] - %m'
    }
}];

//no prod logs also output to onsole
config.DEBUG && appenders.push({type: 'console'});

//create the log path if it doesn't exist
fs.existsSync(config.API_LOG_PATH) || fs.mkdirSync(config.API_LOG_PATH);

log4js.configure({appenders});
let logger = log4js.getLogger('SITE');
logger.setLevel('INFO');

module.exports = logger;