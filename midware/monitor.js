const monitor = require('express-status-monitor')

module.exports = monitor({
    title: 'Express Status',
    path: '/dashboard',
    spans: [{
        interval: 1,
        retention: 60,
    }, {
        interval: 5,
        retention: 60,
    }, {
        interval: 15,
        retention: 60,
    }],
    chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
    }
})
