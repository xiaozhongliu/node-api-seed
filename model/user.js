const { postgres } = require('../util')
const { INTEGER, STRING } = require('sequelize')

/**
 * 用户
 */
const User = postgres.define('user', {
    userID: { type: INTEGER, primaryKey: true, autoIncrement: true, field: 'user_id' },
    // 系统分类
    sysType: { type: INTEGER, allowNull: false, field: 'sys_type' },
    // 用户名
    username: { type: STRING(50), allowNull: false },
    // 密码
    password: { type: STRING(32), allowNull: false },
    // 头像
    avatar: { type: STRING(200) },
}, {
    comment: '用户表',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    indexes: [{ unique: true, fields: ['sys_type', 'username'] }],
})

module.exports = User
