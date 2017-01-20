//global helpers for custom errors
let messages = require('./message');
global.Message = key => messages.get(key);
global.MessageErr = key => {
    let {code, msg} = Message(key);
    let err = new Error(msg);
    err.code = code;
    return err;
};