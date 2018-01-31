/* eslint no-undef:0 */
const { client } = require('../util')
const message = require('../message')

const domain = {
    dev: 'localhost:8001',
    test: 'todo',
    qa: 'todo',
    prod: 'todo',
}
const host = `http://${domain[process.env.NODE_ENV] || domain.dev}`

describe('base ctrl tests', () => {
    test('login validation  ', async () => {
        const data = {
            sysType: 1,
            username: 'unittest',
            password: 'e10adc3949ba59abbe56e057f20f883e'
        }

        let currentData = Object.assign({}, data)
        delete currentData.sysType
        let res = await client.POST(`${host}/login`, currentData)
        expect(res.code).toBe(message.SysTypeEmpty.code)

        currentData = Object.assign({}, data)
        delete currentData.username
        res = await client.POST(`${host}/login`, currentData)
        expect(res.code).toBe(message.UsernameEmpty.code)

        currentData = Object.assign({}, data)
        delete currentData.password
        res = await client.POST(`${host}/login`, currentData)
        expect(res.code).toBe(message.PasswordEmpty.code)
    })

    test('login succeeds    ', async () => {
        const data = {
            sysType: 1,
            username: 'unittest',
            password: 'e10adc3949ba59abbe56e057f20f883e'
        }

        const res = await client.POST(`${host}/login`, data)
        expect(res.code).toBe(1)
        expect(res.data.username).toBe('unittest')
    })

    test('login fails       ', async () => {
        const data = {
            sysType: 1,
            username: 'unittest',
            password: 'invalid password'
        }

        const res = await client.POST(`${host}/login`, data)
        expect(res.code).toBe(message.LoginFail.code)
    })
})
