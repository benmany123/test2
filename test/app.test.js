/**
 * Server test
 * @name app.test
 * @requires dotenv
 * @requires express
 * @requires cors
 * @requires express-fileupload
 * @requires cookie-parser
 * @requires path
 */
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

/**
 * Router
 * @requires routes/userRouter
 * @requires routes/categoryRouter
 * @requires routes/upload
 * @requires routes/dogRouter
 */
app.use('/user', require('../routes/userRouter'))
app.use('/api', require('../routes/categoryRouter'))
app.use('/api', require('../routes/upload'))
app.use('/api', require('../routes/dogRouter'))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

module.exports = app