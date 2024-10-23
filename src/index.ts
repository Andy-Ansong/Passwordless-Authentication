import {config} from "dotenv"
config()
import * as express from "express"
const app = express()
import * as cors from 'cors'
import db from './db/db'
import seedDatabaseService from "./services/seedDatabaseService"
import swagger from './swagger'
import CustomError from './utils/customError'
import globalErrorHandler from './controllers/errorController'
import limiter from './middleware/rateLimiter'
import * as session from 'express-session'
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"

const port = process.env.PORT
app.use("/api", limiter)
app.use(express())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'amalitech',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000,
        secure: false,
    }
}))

import authRouter from "./routes/authRouter"
app.use("/api/v1/auth", authRouter)
import eventRouter from "./routes/eventRouter"
app.use("/api/v1/events", eventRouter)
import employeeRouter from "./routes/employeeRouter"
app.use("/api/v1/employees", employeeRouter)
import userRouter from "./routes/userRouter"
app.use("/api/v1/users", userRouter)
import imageRouter from "./routes/imageRouter"
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