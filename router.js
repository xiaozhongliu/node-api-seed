let co = require('co');
let router = require('express').Router();
let validate = require('./midware').validate;

/**
 * check health
 */
router.get('/', (req, res) => {
    res.json({code: 1, msg: 'service works well'});
});

/**
 * login api
 */
router.post('/api/login', validate.login, (req, res, next) => {
    co(function*() {
        res.json({
            code: 1,
            msg: 'success'
        });
    }).catch(next);
});

module.exports = router;