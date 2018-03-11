/* ******************************************************************
 * mongo client on the basis of mongoose
 ****************************************************************** */
const mongoose = require('mongoose')
const paginate = require('mongoose-paginate')
const { MONGO } = require('../config')

mongoose.plugin(paginate)
mongoose.plugin((schema) => {
    /**
     * add common fields
     */
    schema.add({ createdAt: { type: Date, default: Date.now } })
    schema.add({ updatedAt: { type: Date, default: Date.now } })

    /**
     * auto update updatedAt
     */
    const updateHandler = function (next) {
        this._update.updatedAt = new Date()
        next()
    }
    schema.pre('update', updateHandler)
    schema.pre('updateOne', updateHandler)
    schema.pre('findOneAndUpdate', updateHandler)
    schema.pre('updateMany', updateHandler)

    /**
     * insert or update
     */
    schema.statics.upsert = function (query, data) {
        return this.findOneAndUpdate(
            query,
            data,
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            },
        )
    }

    /**
     * paged find docs
     */
    schema.statics.page = function (query, pageNo, pageSize) {
        return this.paginate(
            query,
            {
                page: pageNo || 1,
                limit: pageSize || 10,
                sort: '-updatedAt',
            },
        )
    }
})

mongoose.connect(MONGO, {
    promiseLibrary: global.Promise,
    poolSize: 20
}, err => {
    err && console.log(err)
})

module.exports = mongoose
