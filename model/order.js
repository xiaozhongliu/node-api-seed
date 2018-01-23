const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

/**
 * 订单
 */
const Order = new Schema({

    // 订单号
    orderNO: Number,

    // 支付单号
    traceNO: Number,

    // 第三方平台单号
    thirdPartySeq: String,

    // 订单名称
    orderName: String,

    // 支付渠道(枚举值) 1: weixinBarcodePay, 2: alipayBarcodePay
    paymentChannel: Number,

    // 商品ID
    goodID: ObjectId,

    // 订单总额
    orderAmount: Number,

    // 订单状态(枚举值) 0: 待支付, 1: 支付中, 2: 已支付, 3: 已取消
    orderStatus: Number,

    // 订单过期时间(时间戳)
    operateDeadline: Number,

    // 支付过期时间(时间戳)
    paymentExpiry: Number,

    // 发票状态(枚举值) 0: 未申请, 1: 已申请, 2: 已开票
    invoiceStatus: { type: Number, default: 0 },

    // 所有者
    owner: String,

    // 创建人
    creator: String,

    // 交易时间(时间戳)
    payedAt: Number,

    // 取消时间(时间戳)
    cancelledAt: Number,

    // 取消原因
    cancelReason: String,

    // 创建时间(时间戳)
    createdAt: { type: Number, default: Date.now },

    // 更新时间(时间戳)
    updatedAt: { type: Number, default: Date.now },
}, { versionKey: false })

Order.index({ username: 1 })
Order.plugin(require('./plugin/pagedFind'))

mongoose.model('Order', Order)
