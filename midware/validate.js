const { validhelper } = require('../util')

const Type = {
    String: { name: 'String', func: 'isString' },
    Number: { name: 'Number', func: 'isNumeric' },
    Decimal: { name: 'Decimal', func: 'isDecimal' },
    Boolean: { name: 'Boolean', func: 'isBoolean' },
    Url: { name: 'Url', func: 'isURL' },
    Hash: { name: 'Hash', func: 'isHash' },
    Phone: { name: 'Phone', func: 'isPhone' },
    IdCardNO: { name: 'IdCardNO', func: 'isIdCardNO' },
    ObjectId: { name: 'ObjectId', func: 'isMongoId' },
    Stamp: { name: 'Stamp', func: 'isStamp' },
    UnixStamp: { name: 'UnixStamp', func: 'isUnixStamp' },
    StringArray: { name: '[String]', func: 'isStringArray' },
}

module.exports = {

    /**
     * validate api: login
     */
    login: [
        ['sysType', Type.Number, true],
        ['username', Type.String, true],
        ['password', Type.String, true],
    ],

    /**
     * validate api: register
     */
    register: [
        ['sysType', Type.Number, true],
        ['username', Type.String, true],
        ['password', Type.String, true],
        ['avatar', Type.String, false],
    ],

    /**
     * validation helper
     */
    validateParams(req, next, fields) {
        fields.forEach(([field, type, required]) => {
            if (required) {
                const key = getEmptyErrorKey(field)
                validhelper.assertEmptyOne(req, field, global.Message(key).code)
            }
            if (req.query[field] || req.body[field]) {
                validhelper.assertType(req, field, global.Message('CommonErr').code, type)
            }
        })
        handleResult(req, next)
    },
}

function getEmptyErrorKey(field) {
    const firstLetterToUpper = field.slice(0, 1).toUpperCase()
    const otherLetters = field.slice(1)
    return `${firstLetterToUpper}${otherLetters}Empty`
}

function handleResult(req, next) {
    req.getValidationResult().then(result => {
        if (result.isEmpty()) return next()

        const arr = result.array()[0].msg.split('@@')
        const err = new Error(arr[1])
        err.code = parseInt(arr[0], 10)
        return next(err)
    })
}
