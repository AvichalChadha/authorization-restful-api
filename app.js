const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const data_model = require("./Models/model");
const keys = require("./config/keys")
const passportSetup = require('./controllers/passport');
const cookieSession = require('cookie-session');
const Router = require('router')
const router = Router()


mongoose.connect(keys.mongodb.dbURI, function(err){
    if (err){
        //console.log(err)
        console.log("error connecting to database.Check credentials")
    }
    else{
        console.log("connected to mongo")
    }
    
})
// Init App
var app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys:['euhftcycidjdnsns']
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());



const login = require('./routes/login');
app.use('/', login);

const register = require('./routes/register');
app.use('/', register);


const dashboard = require('./routes/dashboard');
app.use('/', dashboard);

const delete_account = require('./routes/delete_account');
app.use('/', delete_account);


const logout = require('./routes/logout');
app.use('/', logout);

const recover_acc = require('./routes/recover_acc');
app.use('/', recover_acc);


const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
