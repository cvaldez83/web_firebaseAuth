const express = require('express')
let router = express.Router()

function getCurrentDateTime(){
    var d = new Date();
    localTime = d.getTime();
    localOffset = d.getTimezoneOffset() * 60000;
    utcTime = localTime + localOffset;
    pstTime = utcTime + (-7 * 3600000)
    var today = new Date(pstTime);
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
}

router.get('/', (req, res, next) => {
    res.clearCookie('idToken')
    res.render('login')
})

router.post('/', (req, res, next) => {
    console.log(getCurrentDateTime() + ' ' + JSON.stringify(req.body))
})

module.exports = router;