let auth = require('http-auth');
let fs = require('fs');
let config = require('../util').config;

let basic = auth.basic({
        realm: "Http Auth Realm"
    }, (username, password, cb) => {
        cb(username == config.HTTP_AUTH.username && password == config.HTTP_AUTH.password);
    }
);

module.exports = (req, res, next) => {
    basic.check(req, res, (req, res, err) => {
        if (err) {
            return next(err);
        }

        //apply http auth to log accessing
        if (/\.log$/.test(req.url)) {
            res.end(fs.readFileSync(config.API_LOG_PATH + req.url.substr(1)));
        }
    });
};