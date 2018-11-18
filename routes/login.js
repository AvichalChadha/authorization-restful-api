const router = require('express').Router()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const if_deleted_account = require('../controllers/delete_func').if_deleted_account

function authCheck(req, res, next){
    if(req.user){
        res.send(JSON.stringify({result:`You are allready loggedin. userID: ${req.user.id} `}))
        
    } else {
        next();     
    }
}



router.post('/login', authCheck  , function(req, res, next) {
    console.log(req.user)
        if_deleted_account(req.body.email).then(function(x){
            if (x == "Account exist"){
                passport.authenticate('local', function(error, user, info) {
                    if (user){
                        req.logIn(user, function(err) {
                            if (err) { return next(err); }
                            return res.send(JSON.stringify({result:`You have successfully loggedin, userID: ${user.id}`}))
                          })
                    }
                    else if(info.message == "Incorrect passwords"){
                        res.send(JSON.stringify({result:"Incorrect password"}))
                    }
                    else{
                        res.send(JSON.stringify({result:"Something went wrong. Please report the issue at avichalchadha100@gmail.com"}))
                    }
                })(req, res, next);
            }
        }).catch(function(x){
            if(x == "Account deleted"){
                console.log("Account deleted")
                res.send(JSON.stringify({result:"The user has deleted this account."}))
            }
            else if (x == "User doesn't exist"){
                res.send(JSON.stringify({result:"User not found"}))
            }
            else{
                console.log(error)
            }
        })
    
    });

module.exports = router