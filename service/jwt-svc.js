const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {

    /**
     * jwt sign
     * @param {object} payload  data to be signed
     */
    async sign(payload) {
        return promisify(jwt.sign)(
            payload,
            config.JWT_SECRET,
            { expiresIn: config.JWT_TOKEN_TIMEOUT },
        )
    },

    /**
     * jwt verify
     * @param {string} token    token to be verified
     */
    async verify(token) {
        const payload = await promisify(jwt.verify)(
            token,
            config.JWT_SECRET,
        )
        delete payload.exp
        delete payload.iat
        return payload
    },
}
