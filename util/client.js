/* ******************************************************************
 * HTTP client on the basis of axios
 ****************************************************************** */
const axios = require('axios')
const { hash } = require('./toolset')

module.exports = {

    async post(url, reqToken, data) {
        const ts = Date.now()
        const token = hash(`${reqToken}${ts}`)
        await axios.post(
            url,
            data,
            {
                headers: {
                    ts,
                    token,
                    platform: 'WEB',
                }
            }
        )
    },
}
