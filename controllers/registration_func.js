const bcrypt = require('bcrypt-nodejs');
const User = require('../Models/model')

function encryption(mypassword){
    var hash = bcrypt.hashSync(mypassword);
    console.log(hash)
    return hash
}

function if_registered(email){
	console.log(email)
	return new Promise(function(resolve, reject){
		try{

		
		User.findOne({ email: email }).then(function(user){
			
			console.log("user")
    	    if (user){
    			console.log("User allready exist")
				resolve("KO")
				  
    	  	}
      		else{
				console.log("new user")
				resolve("OK")
				  
      		}
		})
	}
	catch(err){console.log(err)}
	

	})


}

module.exports = {encryption, if_registered}
