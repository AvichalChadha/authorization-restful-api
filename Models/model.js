const express = require('express')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')


const ObjectId = Schema.ObjectId;

let user_data = new Schema({
		Username:{ type: String, trim:true, default: " " },
		First_name: { type: String, trim:true, default: " " },
		Last_name: { type: String, trim:true, default: " " },
		email: { type: String, trim:true, default: " "},
		password_hash: { type: String, trim:true, default: " "},
		deleted:{ type: Boolean, default: false}
});

//turing schema into model
let User = mongoose.model('passport_auth', user_data);

module.exports = User;
