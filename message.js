const config = require('./config')

module.exports = new Map([
    ['AuthFail', { code: 10001, msg: `身份验证失败:${config.APP_NAME}` }],
    ['NotFound', { code: 10002, msg: '请求的资源不存在:@param' }],
    ['CommonErr', { code: 11000 }], // 无需特殊处理的自定义错误都用这个代码

    ['UsernameEmpty', { code: 11001 }],
    ['PasswordEmpty', { code: 11002 }],
    ['SysTypeEmpty', { code: 11003 }],
    ['LoginFail', { code: 11004, msg: '用户名或密码错误' }],
    ['VerifyFail', { code: 11005, msg: '访问令牌验证失败' }],
    ['UserExist', { code: 11006, msg: '用户已经存在' }],
])
