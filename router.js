const router = require('express').Router()
const { validate } = require('./midware')
const {
    liveCtrl,
} = require('./ctrl')


// test
register('get', '/test', liveCtrl, 'test')


// check health
const monitor = (req, res) => {
    res.json({ code: 1, msg: '服务运转正常' })
}
router.get('/', monitor)
router.get('/monitor', monitor)


/**
 * wrap all ctrl funcs to catch and dredge errors
 */
function co(asyncFunc) {
    return async function (req, res, next) {
        try {
            await asyncFunc(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

/**
 * register ctrl and validate(if any) midware funcs to routes
 * @param {string} method    http method
 * @param {string} path      route path
 * @param {object} ctrl      ctrl namespace
 * @param {string} func      ctrl func name
 */
function register(method, path, ctrl, func) {
    const validFunc = validate[func]
    if (validFunc) {
        return router[method](path, validFunc, co(ctrl[func]))
    }
    return router[method](path, co(ctrl[func]))
}

module.exports = router
