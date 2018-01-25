const config = require('../config')
const { hash } = require('../util')
const { User } = require('../model')
const { jwtSvc } = require('../service')

module.exports = {

    /**
     * login
     */
    async login(req, res, next) {
        let { username, password, redirectUrl } = req.body

        // user exists and username & password match
        const getRes = await User.findOne({ where: { username } })
        if (
            !getRes ||
            getRes.username !== username ||
            getRes.password !== hash(password + config.HASH_SECRET)
        ) {
            return next(global.MessageErr('LoginFail'))
        }

        // create jwt token
        const accessToken = await jwtSvc.sign({ username })

        if (redirectUrl) {
            redirectUrl = `${redirectUrl}?accessToken=${accessToken}`
        }

        res.success({
            accessToken,
            sysType: getRes.sysType,
            username: getRes.username,
            avatar: getRes.avatar,
            redirectUrl,
        })
    },

    /**
     * verify jwt token
     */
    async verify(req, res, next) {
        const { authorization } = req.headers
        if (!authorization) {
            return next(global.MessageErr('VerifyFail'))
        }
        const accessToken = authorization.substr(7)

        // verify jwt token
        let payload
        try {
            payload = await jwtSvc.verify(accessToken)
        } catch (e) {
            return next(global.MessageErr('VerifyFail'))
        }
        if (!payload) {
            return next(global.MessageErr('VerifyFail'))
        }

        res.success(payload)
    },

    /**
     * register
     */
    async register(req, res, next) {
        let { sysType, username, password, avatar } = req.body

        // user exists
        if (await User.findOne({ where: { username } })) {
            return next(global.MessageErr('UserExist'))
        }

        password = hash(password + config.HASH_SECRET)
        await User.create({
            sysType,
            username,
            password,
            avatar,
        })

        res.success()
    },
}
