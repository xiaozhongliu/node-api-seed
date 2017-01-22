let schedule = require('node-schedule');
let moment = require('moment');
let config = require('../util/toolset').getConfig();
let logger = require('./logger');

logger.info(`${moment().format('YYYY-MM-DD HH:mm:ss')} 【 task starts 】\n`);

/**
 * execute task at 3:00 everyday
 */
schedule.scheduleJob({hour: 3, minute: 0, second: 0}, () => {

    let now = new Date().getTime();
    logStart(now);

    //task logic

    logEnd(now, count);
});

function logStart(start) {
    logger.info(`${moment(start).format('YYYY-MM-DD HH:mm:ss')} ============== 访问令牌过期清空任务 开始执行 =======================`);
}

function logEnd(start, count) {
    let current = new Date().getTime();
    logger.info(`   >>>>>>>>>>>>>>>>>>>> 用时${(( current - start) / 1000)}秒从REDIS清除了${count}条用户记录 <<<<<<<<<<<<<<<<<<<<`);
    logger.info(`${moment(current).format('YYYY-MM-DD HH:mm:ss')} ============== 访问令牌过期清空任务 结束执行 =======================\n\n`);
}