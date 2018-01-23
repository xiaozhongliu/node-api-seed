const config = require('./config')

module.exports = new Map([
    ['AuthFail', { code: 10001, msg: `身份验证失败:${config.APP_NAME}` }],
    ['NotFound', { code: 10002, msg: '请求的API接口或文件不存在:@param' }],
    ['CommonErr', { code: 15000 }], // 无需特殊处理的自定义错误都用这个代码

    ['LiveUrlEmpty', { code: 15001 }],
    ['TimeoutGettingToken', { code: 15002, msg: 'websocket token获取超时' }],
])
