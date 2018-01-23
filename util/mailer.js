/* ******************************************************************
 * mail client on the basis of nodemailer
 ****************************************************************** */
const nodemailer = require('nodemailer')
const { MAILER, MAILER_ON } = require('../config')

const transporter = nodemailer.createTransport({
    host: MAILER.HOST,
    port: MAILER.PORT,
    auth: {
        user: MAILER.USER,
        pass: MAILER.PASS,
    }
})

module.exports = {

    /**
     * send rich text mail
     * @param {string} appName      app name
     * @param {string} partialBody  part of mail body in html
     */
    alarm(appName, partialBody) {
        if (!MAILER_ON) return

        const entireBody = `<span style="font-family: 'Microsoft YaHei'"><b>错误详情:</b> ${partialBody}</span>`
        const mailOptions = {
            from: `"${MAILER.NICK_NAME}" <${MAILER.USER}>`,
            to: MAILER.RECEIVERS.join(','),
            subject: `[${getEnv()}]应用[${appName}]出错`,
            html: entireBody
        }
        transporter.sendMail(mailOptions, (err, info) => { // eslint-disable-line
            err && console.log('MAIL ALARM FAIL:   ', err)
        })
    },
}

function getEnv() {
    const { NODE_ENV } = process.env
    if (!NODE_ENV) return '开发环境'
    return envMap[NODE_ENV]
}

const envMap = {
    dev: '开发环境',
    test: '测试环境',
    qa: 'QA环境',
    prod: '生产环境',
}
