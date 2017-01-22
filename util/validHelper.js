module.exports = {

    /**
     * validate if a field is empty
     * @param req      req obj
     * @param field    target field
     * @param code     validation err code
     */
    assertEmptyOne(req, field, code) {
        let assertMethod = req.method == 'GET' ? req.checkQuery : req.checkBody;
        assertMethod(field, `${code}@@请求参数${field}不能为空`).notEmpty();
    },

    /**
     * batch validate if some fields are empty
     * @param req       req obj
     * @param fields    target fields list
     */
    assertEmpty(req, fields) {
        fields.forEach(field => {
            this.assertEmptyOne(req, field, Message('CommonErr').code);
        });
    },

    /**
     * validate if some header fields are empty
     * @param req       req obj
     * @param fields    target fields list
     */
    assertEmptyFromHeader(req, fields) {
        fields.forEach(field => {
            let {code, msg} = Message('AuthFail');
            req.checkHeaders(field, `${code}@@${msg}`).notEmpty();
        });
    },
};