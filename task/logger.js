let fs = require('fs');
let log4js = require('log4js');
let config = require('../util/toolset').getConfig();

let appenders = [{
    type: 'dateFile',
    category: 'TASK',
    filename: `${config.TASK_LOG_PATH}`,
    pattern: 'yyyyMM.log',
    alwaysIncludePattern: true,
    layout: {
        type: 'pattern',
        pattern: '%m'
    }
}];

//no prod logs also output to onsole
!config.DEBUG || appenders.push({type: 'console'});

//create the log path if it doesn't exist
fs.existsSync(config.TASK_LOG_PATH) || fs.mkdirSync(config.TASK_LOG_PATH);

log4js.configure({appenders});
let logger = log4js.getLogger('TASK');
logger.setLevel('INFO');

module.exports = logger;