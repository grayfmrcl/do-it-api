const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
require('dotenv').config()

const routers = require('./routers')

const port = process.env.PORT || 3000
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/do-it', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('connected to db!'))

app.use(logger('dev'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routers)

app.use('*', function (req, res) {
    res.status(404).json({ message: `NOT FOUND` });
});

app.use(function (err, req, res, next) {
    if (err.name == 'ValidationError') {
        res.status(400)
            .json(Object.values(err.errors).map(e => e.message))
    }
    else {
        console.log(err)
        res.status(500).json({ message: `oops! something went wrong` })
    }
});

app.listen(port, () => console.log(`listening to port ${port}`))