let config
try {
    const env = process.env.NODE_ENV || 'test'
    console.log(`env is: ${env}`)
    config = require('./base')
    const customConfig = require(`./${env}`)
    config = mergeDeep(config, customConfig)
} catch (e) {
    console.log('error loading config: ', e)
    process.exit()
}

/**
 * helper methods
 */
function mergeDeep(target, source) {
    const output = Object.assign({}, target)
    if (!isObject(target) || !isObject(source)) {
        return output
    }
    Object.keys(source).forEach(key => {
        if (isObject(source[key]) && target[key]) {
            output[key] = mergeDeep(target[key], source[key])
            return
        }
        output[key] = source[key]
    })
    return output
}

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item)
}

module.exports = config
