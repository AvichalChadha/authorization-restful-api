const router = require('express').Router()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const if_deleted_account = require('../controllers/delete_func').if_deleted_account
const check_creds = require("../controllers/login_func")
const User = require('../Models/model')

router.put('/recover-account' , function(req, res, next) {
    console.log(req.user)
    const email = req.body.email
    const password = req.body.password 
        if_deleted_account(req.body.email).then(function(x){
            if (x == "Account exist"){
                res.send(JSON.stringify({result:"Account already exist, no need to recover!"}))
            }
        }).catch(function(x){
            if(x == "Account deleted"){
                check_creds(email, password).then(function(user){
                    
                    User.findOneAndUpdate({ email: email}, {deleted:false}).then(function(userInfo){
                        console.log(userInfo)
                        res.send(JSON.stringify({result:"Account recovered."}))
                    })
                    .catch(function(err){
                        console.log(err) 
                    })

                }).catch(function(x){
                    if (x == "incorrect pwd"){
                        res.send(JSON.stringify({result:"Incorrct password."}))
                        
                    }
                    else if (x == "No user found"){
                        console.log("No user found")
                        res.send(JSON.stringify({result:"User not found"}))
                    }
                    else{
                        console.log("something went wrong")
                        res.send(JSON.stringify({result:"Something went wrong"}))
                    }
                })
                
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