/* ******************************************************************
 * HTTP client on the basis of axios
 ****************************************************************** */
const axios = require('axios')

axios.interceptors.response.use(({ data }) => data)

module.exports = {

    GET(url, params, headers) {
        return axios.get(
            url,
            {
                headers,
                params,
            }
        )
    },

    POST(url, data, headers) {
        return axios.post(
            url,
            data,
            { headers }
        )
    },

    PUT(url, data, headers) {
        return axios.put(
            url,
            data,
            { headers }
        )
    },

    DELETE(url, headers) {
        return axios.delete(
            url,
            { headers }
        )
    },

}
