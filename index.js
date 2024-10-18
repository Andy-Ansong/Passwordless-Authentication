import {config} from "dotenv"
config()
import express from "express"
const app = express()
import cors from 'cors'
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
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(bodyParser.json())
app.use(session({
    secret: 'amalitech',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 5 * 60 * 1000,
        secure: false,
    }
}))

import authRouter from "./routes/authRouter.js"
app.use("/api/v1/auth", authRouter)
import eventRouter from "./routes/eventRouter.js"
app.use("/api/v1/events", eventRouter)
import employeeRouter from "./routes/employeeRouter.js"
app.use("/api/v1/employees", employeeRouter)
import userRouter from "./routes/userRouter.js"
app.use("/api/v1/users", userRouter)
import imageRouter from "./routes/imageRouter.js"
app.use("/image", imageRouter)

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