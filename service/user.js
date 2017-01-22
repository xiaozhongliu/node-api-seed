let User = require('../db').User;

module.exports = {

    /**
     * get user by username
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