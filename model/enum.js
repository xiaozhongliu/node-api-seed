module.exports = {

    // a enum sample
    EnumSample: {
        ItemOne: { value: 0, text: 'descone' },
        ItemTwo: { value: 1, text: 'desctwo' },
    },


    /**
     * enum helpers
     */
    getEnumByValue(enumObj, value) {
        let target
        value = Number(value)

        Object.keys(enumObj).some(key => {
            const current = enumObj[key]
            if (current.value === value) {
                target = current
                return true
            }
        })
        return target
    },

    getTextByValue(enumObj, value) {
        let target
        value = Number(value)

        Object.keys(enumObj).some(key => {
            if (enumObj[key].value === value) {
                target = enumObj[key].text
                return true
            }
        })
        return target
    },

    getNameByValue(enumObj, value) {
        let target
        value = Number(value)

        Object.keys(enumObj).some(key => {
            if (enumObj[key].value === value) {
                target = key
                return true
            }
        })
        return target
    },

    getEnumTexts(enumObj) {
        return Object.keys(enumObj).map(key => {
            return enumObj[key].text
        })
    },
}
