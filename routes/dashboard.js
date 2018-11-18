const router = require('express').Router()

function authCheck(req, res, next){
    console.log("1234567890")
    console.log(req)
    console.log("123456789023456789")
    if(req.user){
    	console.log( req.user.Username)
		next();     
    } else {
    	res.send(JSON.stringify({result:"Please login"}))
    }
}

router.get('/dashboard', authCheck ,function(req, res){
	res.send(JSON.stringify({result:`hi ${req.user.Username}, welcome to dashboard`}))
})


module.exports = router;
