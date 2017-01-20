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

//非生产环境日志同时输出到console
!config.DEBUG || appenders.push({type: 'console'});

//如果日志目录不存在则创建
fs.existsSync(config.TASK_LOG_PATH) || fs.mkdirSync(config.TASK_LOG_PATH);

log4js.configure({appenders});
let logger = log4js.getLogger('TASK');
logger.setLevel('INFO');

module.exports = logger;