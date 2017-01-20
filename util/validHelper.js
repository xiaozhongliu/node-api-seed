module.exports = {

    /**
     * 校验单个参数是否为空,并传入校验失败错误代码
     * @param req      request对象
     * @param field    待校验参数
     * @param code     校验失败错误代码
     */
    assertEmptyOne(req, field, code) {
        let assertMethod = req.method == 'GET' ? req.checkQuery : req.checkBody;
        assertMethod(field, `${code}@@请求参数${field}不能为空`).notEmpty();
    },

    /**
     * 批量校验参数是否为空
     * @param req       request对象
     * @param fields    待校验参数列表
     */
    assertEmpty(req, fields) {
        fields.forEach(field => {
            this.assertEmptyOne(req, field, Message('CommonErr').code);
        });
    },

    /**
     * 校验header中的字段是否为空
     * @param req       request对象
     * @param fields    待校验参数列表
     */
    assertEmptyFromHeader(req, fields) {
        fields.forEach(field => {
            let {code, msg} = Message('AuthFail');
            req.checkHeaders(field, `${code}@@${msg}`).notEmpty();
        });
    },
};