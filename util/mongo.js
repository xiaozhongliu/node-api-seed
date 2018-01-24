/* ******************************************************************
 * mongo client on the basis of mongoose
 ****************************************************************** */
const Mongoose = require('mongoose')
const { MONGO } = require('../config')

Mongoose.connect(MONGO, {
    promiseLibrary: global.Promise,
    poolSize: 20
}, err => {
    err && console.log(err)
})

module.exports = Mongoose
