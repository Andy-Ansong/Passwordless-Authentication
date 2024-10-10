const rateLimit = require('express-rate-limit')

let limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "We have received too many requests from this device, please try after one hour"
})

module.exports = limiter