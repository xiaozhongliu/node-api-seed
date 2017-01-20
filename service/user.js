let User = require('../db').User;

module.exports = {

    /**
     * 根据username查询user
     * @param username
     * @returns {*}
     */
    getUser(username){
        return User.findOne({
            attributes: ['password'],
            where: {username}
        });
    },
};