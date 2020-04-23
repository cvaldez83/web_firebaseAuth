const path = require('path')
const express = require('express')
let router = express.Router()
var admin = require('firebase-admin')


router.get('/', (req, res, next) => {
    console.log('get dashboard route successfully reached')
    console.log(req.cookies.cookieToken)
    res.render('dashboard')

})

// router.post('/',(req, res, next) => {
//     console.log('post received')
//     res.redirect('/')
// })



module.exports = router;