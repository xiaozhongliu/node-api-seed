/* ******************************************************************
 * extends targets here
 ****************************************************************** */
const express = require('express')

express.response.success = function (data, msg = 'success') {
    this.json({ code: 1, msg, data })
}

express.response.fail = function (code = -1, msg = 'fail') {
    this.json({ code, msg })
}
