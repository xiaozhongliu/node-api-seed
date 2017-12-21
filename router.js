const co = require('co')
const xml2json = require('xml2json')
const router = require('express').Router()
const validate = require('./midware').validate

/**
 * check health
 */
router.get('/', (req, res) => {
    req.rawBody = ''
    var json = {}
    req.setEncoding('utf8')
    req.on('data', chunk => {
        req.rawBody += chunk
    })
    req.on('end', () => {
        json = xml2json.toJson(req.rawBody)
        res.send(JSON.stringify(json))
    })
})

/**
 * login api
 */
router.post('/api/login', validate.login, (req, res, next) => {
    co(function* () {
        res.json({
            code: 1,
            msg: 'success'
        })
    }).catch(next)
})

module.exports = router