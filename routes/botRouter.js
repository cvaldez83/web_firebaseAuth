const express = require('express')
let router = express.Router()

function validateUser(req, res, next){
    res.locals.validated = true
    console.log('validated')
    next()
}
// validateUser is middleware that will only be added to this userRouter 
router.use(validateUser)

router.get('/',(req, res, next) => {
    // username = request.headers.username
    res.json({
        msg: "Router works!"
    })
})

module.exports = router;