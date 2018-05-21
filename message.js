const config = require('./config')

module.exports = {
    AuthFail: { code: 10001, msg: `身份验证失败:${config.API_NAME}` },
    NotFound: { code: 10002, msg: '请求的资源不存在:@param' },

    CommonErr: { code: 11000 },
    SysTypeEmpty: { code: 11001 },
    UsernameEmpty: { code: 11002 },
    PasswordEmpty: { code: 11003 },
    LoginFail: { code: 11004, msg: '用户名或密码错误' },
    VerifyFail: { code: 11005, msg: '访问令牌验证失败' },
    UserExist: { code: 11006, msg: '用户已经存在' },
}
