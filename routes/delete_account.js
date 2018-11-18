const router = require('express').Router()
const User = require('../Models/model')
const find_and_update= require('../controllers/delete_func').find_and_update



function authCheck(req, res, next){

    if(req.user){
    	console.log( req.user.Username)
		next();     
    }else {
    	res.send(JSON.stringify({result:"Please login to delete your account."}))
    }
}





router.put('/delete-account', authCheck ,function(req, res){
    const email = req.user.email
    find_and_update(email)
    req.logout()
    res.send(JSON.stringify({result:"Your account is successfully deleted."}))
    
    
})


module.exports = router;