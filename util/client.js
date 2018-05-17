/* ******************************************************************
 * http client on the basis of axios
 ****************************************************************** */
const axios = require('axios')

axios.interceptors.response.use(({ data }) => data)

module.exports = {

    get(url, params, headers) {
        return axios.get(
            url,
            {
                headers,
                params,
            },
        )
    },

    post(url, data, headers) {
        return axios.post(
            url,
            data,
            { headers },
        )
    },

    put(url, data, headers) {
        return axios.put(
            url,
            data,
            { headers },
        )
    },

    delete(url, headers) {
        return axios.delete(
            url,
            { headers },
        )
    },
}
