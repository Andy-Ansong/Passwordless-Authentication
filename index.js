require("dotenv").config()
const express = require("express")
const app = express()
require('./db/db')
require("./services/seedDatabaseService")
const { specs, swaggerUi } = require('./swagger')
const CustomError = require('./utils/customError')
const globalErrorHandler = require('./controllers/errorController')
const limiter = require('./middleware/rateLimiter')
const session = require('express-session')

const port = process.env.PORT
app.use("/api", limiter)
app.use(express.json())
app.use(require('body-parser').json())
app.use(session({
    secret: 'amalitech',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

const authRouter = require("./routes/authRouter")
app.use("/api/v1/auth", authRouter)
const profileRouter = require("./routes/profileRouter")
app.use("/api/v1/profile", profileRouter)
const adminRouter = require("./routes/adminRouter")
app.use("/api/v1/admin", adminRouter)
const employeeRouter = require("./routes/employeeRouter")
app.use("/api/v1/employee", employeeRouter)
const userRouter = require("./routes/userRouter")
app.use("/api/v1/user", userRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

app.get('/', (req, res) => {
    res.send(`<a href="${req.protocol + '://' + req.get('host')}/api-docs">Swagger docs</a>`)
})

app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on server!`, 404)
    next(err)
})

app.use(globalErrorHandler)

app.listen(port, () => {
    console.log(`Visit http://localhost:${port}/`)
})

module.exports = app