const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const encryption = require("../controllers/registration_func").encryption;
const if_registered = require("../controllers/registration_func").if_registered;
const bcrypt = require('bcrypt-nodejs');
const userData = require('../controllers/save_registration_data.js');
const User = require('../Models/model');


router.post('/register', function (req, res) {
    const user_form_data =  req.body;
    let password_hash =  encryption(user_form_data.password);
    //createing an instance of the model.
    const Username = user_form_data.Username;
    const email = user_form_data.email;
    const Last_name = user_form_data.Last_name;
    const First_name = user_form_data.First_name;
    if_registered(email).then(function(result){
        console.log(result)
    	if (result == "KO"){
    		res.send(JSON.stringify({result:"This account with this email id allready exits"}));
    	}
    	else if (result == "OK"){
    	 	let data = new userData(Username,email, password_hash, First_name, Last_name);
    		data.user();
    		res.send(JSON.stringify({result:"Account successfully created."}));
    	}
    })   
})



module.exports = router;
