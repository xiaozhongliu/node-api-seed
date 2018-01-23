const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {

    /**
     * jwt sign
     * @param {object} payload  data to be signed
     */
    async sign(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                config.JWT_SECRET,
                { expiresIn: config.JWT_TOKEN_TIMEOUT },
                (err, token) => {
                    if (err) reject(err)
                    resolve(token)
                }
            )
        })
    },

    /**
     * jwt verify
     * @param {string} token    token to be verified
     */
    async verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                config.JWT_SECRET,
                (err, payload) => {
                    if (err) reject(err)

                    delete payload.iat
                    delete payload.exp
                    resolve(payload)
                }
            )
        })
    },
}
