import {config} from "dotenv"
config()
import express, { json } from "express"
const app = express()
import db from './db/db.js'
import seedDatabaseService from "./services/seedDatabaseService.js"
import swagger from './swagger.js'
import CustomError from './utils/customError.js'
import globalErrorHandler from './controllers/errorController.js'
import limiter from './middleware/rateLimiter.js'
import session from 'express-session'
import bodyParser from "body-parser"

const port = process.env.PORT
app.use("/api", limiter)
app.use(json())
app.use(bodyParser.json())
app.use(session({
    secret: 'amalitech',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false}
}))

import authRouter from "./routes/authRouter.js"
app.use("/api/v1/auth", authRouter)
import profileRouter from "./routes/profileRouter.js"
app.use("/api/v1/profiles", profileRouter)
import eventRouter from "./routes/eventRouter.js"
app.use("/api/v1/events", eventRouter)
import employeeRouter from "./routes/employeeRouter.js"
app.use("/api/v1/employees", employeeRouter)
import userRouter from "./routes/userRouter.js"
app.use("/api/v1/users", userRouter)

app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs, {explorer: true}));

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

export default app