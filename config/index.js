try {
    const env = process.env.NODE_ENV || 'test'
    console.log(`env is: ${env}`)
    const config = require('./base')
    const customConfig = require(`./${env}`)
    module.exports = mergeDeep(config, customConfig)
} catch (e) {
    console.log('error loading config: ', e)
    process.exit()
}

/**
 * helper methods (they should be here other than ..util namespace)
 */
function mergeDeep(target, source) {
    const output = Object.assign({}, target)
    if (!isObject(target) || !isObject(source)) {
        return output
    }
    Object.keys(source).forEach(key => {
        if (target[key] && isObject(source[key])) {
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
