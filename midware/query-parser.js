module.exports = (req, res, next) => {
    const { query } = req

    for (const field of Object.keys(query)) {
        // parse integer
        if (/^[-+]?[0-9]+$/.test(query[field])) {
            query[field] = parseInt(query[field], 10)
            continue
        }

        // parse float
        if (/^[-+]?[.0-9]+$/.test(query[field])) {
            query[field] = parseFloat(query[field])
        }
    }

    next()
}
