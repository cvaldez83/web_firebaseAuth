const path = require('path')
const express = require('express')
let router = express.Router()
var admin = require('firebase-admin')

// Create service account. Got this json file from Firebase > Settings > Service Accounts
var serviceAccount = require('../fbServiceAccountKey.json')
var firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://fir-auth-7d9cd.firebaseio.com'
    })

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

function consoleLogWithTime(string){
    console.log(getCurrentDateTime() +' ' + string)
}

// Create authentication middleware function
async function isAuthenticated(request, response, next){
    // Grab idToken from cookies
    const idToken = request.cookies.idToken
    if (idToken) {
        consoleLogWithTime('isAuthenticated executed. id_Token[-10] = ' + idToken.slice(-10))
    }
    // Try decoding the Token
    try{
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        // Verify that both decodedToken exists and the uid matches my number
        if (decodedToken && decodedToken.uid === '<YOUR USERNAME UID') {
            consoleLogWithTime('token successfully decoded')
            // request.body.uid = decodedToken.uid; // whats this do?
            consoleLogWithTime('uid: ' + decodedToken.uid)
            // res.cookie('idToken', idToken)

            return next();
        } else {
            consoleLogWithTime('token not decoded!!!!!!!')
            return response.status(401).send('You are not authorized');
        }
    } catch (e) {
        consoleLogWithTime('token not decoded and incorrect uid!')
        // console.log(e)
        return response.redirect('login')
    }
}
// validateUser is middleware that will only be added to this userRouter 
// router.use(isAuthenticated)

router.get('/', isAuthenticated, (req, res, next) => {
    consoleLogWithTime('get index route successfully reached')
    res.clearCookie('idToken')
    res.render('index')
})

// router.post('/',(req, res, next) => {
//     console.log('post received')
//     res.redirect('/')
// })



module.exports = router;