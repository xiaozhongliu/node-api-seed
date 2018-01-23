/* ******************************************************************
 * mongo client on the basis of mongoose
 ****************************************************************** */
const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(config.MONGO, {
    promiseLibrary: global.Promise,
    useMongoClient: true,
    poolSize: 20
}, err => {
    err && console.log(err)
})

module.exports = mongoose
