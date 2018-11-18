const router = require('express').Router()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


function authCheck(req, res, next){
	console.log(req.user)
    if(req.user){
    	console.log( req.user.Username)
		next();     
    } else {
        console.log("else")
        res.send(JSON.stringify({result:"You are allready not logged in. "}))
    }
}



router.get('/logout',authCheck,
  	function(req, res) {
  		req.logout()
  		res.send(JSON.stringify({result:"You have been logged out."}))
  	}
)





module.exports = router;
