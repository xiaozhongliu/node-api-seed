require('../util/mongo')

module.exports = {
    Enum: require('./enum'),    // all enums
    User: require('./user'),    // a sequelize model
    Order: require('./order'),  // a mongoose model
}
