/* ******************************************************************
 * extends targets here
 ****************************************************************** */
const express = require('express')

Object.assign(express.response, {

    success(data, msg = 'success') {
        this.json({ code: 1, msg, data })
    },

    fail(code = -1, msg = 'fail') {
        this.json({ code, msg })
    },
})
