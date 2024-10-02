require("dotenv").config()
const express = require("express")
const app = express()
require('./db/db')
const userRouter = require("./routes/userRouter")

app.use(express.json())
app.use("/users", userRouter)

const port = process.env.PORT

app.listen(port, () => {
    console.log("Running on port ", port)
})

app.get("/", (req, res) => {
    res.send({message: "Api is running"})
})