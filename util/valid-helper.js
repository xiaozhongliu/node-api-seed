/* ******************************************************************
 * helper functions for express-validator
 ****************************************************************** */
module.exports = {

    /**
     * check if a field is empty
     * @param {object} req    request obj
     * @param {string} field  target field
     * @param {number} code   validation err code
     */
    assertEmptyOne(req, field, code) {
        const assertMethod = getMethod(req, field)
        assertMethod(field, `${code}@@请求参数${field}不能为空`).notEmpty()
    },

    /**
     * check if some header fields are empty
     * @param {object} req      request obj
     * @param {[string]} fields target fields list
     */
    assertEmptyFromHeader(req, fields) {
        fields.forEach(field => {
            const { code, msg } = global.Message('AuthFail')
            req.checkHeaders(field, `${code}@@${msg}`).notEmpty()
        })
    },

    /**
     * check field type
     * @param {object} req      request obj
     * @param {string} field    target field
     * @param {number} code     error code
     * @param {object} type     field type
     */
    assertType(req, field, code, type) {
        const assertMethod = getMethod(req, field)
        const midRes = assertMethod(
            field,
            `${code}@@请求参数${field}的值${getFieldValue(req, field)}不是${type.name}类型`,
        )
        midRes[type.func]()
    },
}

function getMethod(req, field) {
    if (req.method === 'GET' && req.query[field]) return req.checkQuery
    else if (req.method !== 'GET' && req.body[field]) return req.checkBody
    return req.checkParams
}

function getFieldValue(req, field) {
    let value
    if (req.method === 'GET' && req.query[field]) value = req.query[field]
    else if (req.method !== 'GET' && req.body[field]) value = req.body[field]
    else value = req.params[field]

    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    return value
}
