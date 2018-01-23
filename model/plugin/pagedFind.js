module.exports = schema => {
    schema.statics.pagedFind = function ({
        filters = {},
        keys = '',
        limit = 20,
        page = 1,
        sort = {}
    }) {
        const thisSchema = this

        const output = {
            page,
            total: 0,
            list: null,
        }

        const countResults = function (callback) {
            thisSchema.count(filters, (err, count) => {
                if (err) return callback(err)

                output.total = count
                callback(null)
            })
        }

        const getResults = function (callback) {
            thisSchema.find(filters, keys)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sort)
                .lean()
                .exec((err, results) => {
                    if (err) return callback(err)

                    output.list = results.map(global.FormatMongoRes)
                    callback(null)
                })
        }

        return Promise.all([
            countResults(),
            getResults(),
        ])
    }
}
