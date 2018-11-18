const mongoose = require("mongoose")
const keys = require("../config/keys")
var data_model = require("../Models/model");



class Database {
	constructor(Username,email,password_hash, First_name, Last_name){
  		this.Username = Username
  		this.email = email
  		this.password_hash = password_hash
  		this.First_name = First_name
  		this.Last_name = Last_name
	}

 	user() {

 		let user_data = {
 				"Username": this.Username,
 				"email": this.email,
 				"password_hash": this.password_hash,
 				"First_name": this.First_name,
 				"Last_name":this.Last_name
 		}
 		console.log(user_data)

 		const instance = new data_model(user_data)
 		instance.save(function(err){
 			if (err){
 				console.log(err)
 			}
 			else{
 				console.log("No error saving the data in db.")
 			}
 		})
	}
}



module.exports = Database;
