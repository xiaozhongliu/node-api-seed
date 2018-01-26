module.exports = schema => {
    schema.statics.pagedFind = function ({
        filters = {},
        keys = '',
        limit = 20,
        page = 1,
        sort = {}
    }) {
        const output = {
            page,
            total: 0,
            list: null,
        }

        const countResults = callback => {
            this.count(filters, (err, count) => {
                if (err) return callback(err)

                output.total = count
                callback(null)
            })
        }

        const getResults = callback => {
            this.find(filters, keys)
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
