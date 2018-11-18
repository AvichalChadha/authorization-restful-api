const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/model')
const check_creds = require('./login_func')
const keys = require("../config/keys")


 
passport.serializeUser(function(user, done) {
  console.log(`user.id ${user.id}`)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUserID", id)
  User.findById(id).then(function(user){
    done(null, user)
  });
});


passport.use(new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
    function( req, email, password, done) {
        console.log(`email:${email}, password${password}`);
        const user  = check_creds(email, password)
        .then(function(user){
            return done(null, user);
        })
        .catch(function (x){
            console.log(x)
            if (x == "incorrect pwd"){
                console.log("Incorrect passwords");
                //Call a function here before it call done to send message to front-end. 
                return done(null, false, {message:"Incorrect passwords"});
            }
            else if (x == "No user found"){
                console.log("No user found")
                return done(null, false, {message:"No user found"})
            }
            else{
                console.log("something went wrong")
                return done(null, false, {message:"something went wrong"});
            }

        })
    }
));
