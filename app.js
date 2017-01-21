require('./globalHelper');
let express = require('express');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let router = require('./router');
let {
    httpAuth,
    httplog,
    cors,
    auth,
    validate,
} = require('./midware');
let {
    config,
    customValidators,
} = require('./util');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator({customValidators}));

app.get(config.HTTP_AUTH.itemsReg, httpAuth);
app.use(httplog);
app.use(cors);
app.use(auth);
app.use(validate.common);
app.use(router);

app.use((req, res, next) => {
    next(MessageErr('NotFound'));
});

//collection of custom error codes
let messages = require('./message');
let messageCodes = [...messages.values()].map(i => i.code);

app.use(({code = -1, message, stack}, req, res, next) => {
    res.json({code, msg: message});
    //output stack of unexpected error to console, for trouble shooting
    messageCodes.includes(code) || console.log(stack);
});

app.listen(config.PORT);