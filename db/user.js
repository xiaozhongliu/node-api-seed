let db = require('./dbClient');
let {INTEGER, STRING} = require('sequelize');

let User = db.define('user', {
    userId: {type: INTEGER, field: 'user_id', primaryKey: true, autoIncrement: true},
    username: {type: STRING(50), allowNull: false},
    password: {type: STRING(32), allowNull: false}
}, {
    comment: '用户表',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    indexes: [{unique: true, fields: ['username']}]
});

// //node db/user
// User.sync().then(() => User.create({
//     username: 'test',
//     password: '13a9d5bba6ef8671067007eb684dc02e'
// }));

module.exports = User;