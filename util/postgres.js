/* ******************************************************************
 * postgres client on the basis of sequelize
 ****************************************************************** */
const Sequelize = require('sequelize')
const { POSTGRES } = require('../config')

module.exports = new Sequelize(
    POSTGRES.BASE,
    POSTGRES.USER,
    POSTGRES.PASS,
    {
        host: POSTGRES.HOST,
        dialect: 'postgres',
        logging: false,
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
    },
)
