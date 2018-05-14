module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT,DELETE')
    res.header('Access-Control-Allow-Headers', 'content-type,authorization')
    next()
}
