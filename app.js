require("dotenv").config()
const express = require("express")
const app = express()
require('./db/db')

const port = process.env.PORT
app.use(express.json())
app.use(require('body-parser').json())

const authRouter = require("./routes/authRouter")
app.use("/auth", authRouter)
const profileRouter = require("./routes/profileRouter")
app.use("/profile", profileRouter)

app.listen(port, () => {
    console.log("Running on port ", port)
})
