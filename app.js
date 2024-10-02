require("dotenv").config()
const express = require("express")
const app = express()
require('./db/db')
const userRouter = require("./routes/userRouter")

app.use(express.json())
app.use(require('body-parser').json())
app.use("/", userRouter)

const port = process.env.PORT

app.listen(port, () => {
    console.log("Running on port ", port)
})
