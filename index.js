require("dotenv").config()
const express = require("express")
const app = express()
require('./db/db')
const { specs, swaggerUi } = require('./swagger')

const port = process.env.PORT
app.use(express.json())
app.use(require('body-parser').json())

const authRouter = require("./routes/authRouter")
app.use("/api/v1/auth", authRouter)
const profileRouter = require("./routes/profileRouter")
app.use("/api/v1/profile", profileRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/api', (req, res) => {
    res.send('Api is currently running!');
});

app.listen(port, () => {
    console.log("Running on port ", port)
})

module.exports = app