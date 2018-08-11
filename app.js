const express = require('express')

const routers = require('./routers')

const port = process.env.PORT || 3000
const app = express()

app.use('/', routers)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(port, () => console.log(`listening to port ${port}`))