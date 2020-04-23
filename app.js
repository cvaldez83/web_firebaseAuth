const path = require('path');
const express = require('express')
const app = express()
var admin = require('firebase-admin')
var cookieParser = require('cookie-parser');

app.use(cookieParser());

// Setup helmet
const helmet = require('helmet')
app.use(helmet())

// Serve up static files
app.use(express.static('public'))

// Parse json and urlencoded data into req.body
app.use(express.json())
app.use(express.urlencoded())

// Setup view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const loginRouter = require('./routes/loginRouter')
const homeRouter = require ('./routes/homeRouter')
const botRouter = require ('./routes/botRouter')
const dashboardRouter = require ('./routes/dashboardRouter')

app.use('/login', loginRouter)
app.use('/', homeRouter)
app.use('/bot', botRouter)
app.use('/dashboard', dashboardRouter)

// app.post('/process_login', (req, res, next) => {
//     res.cookie('idToken', idToken)
// })

var PORT = 5000
app.listen(PORT, function(){
    console.log('Server started on port ' + PORT)
})