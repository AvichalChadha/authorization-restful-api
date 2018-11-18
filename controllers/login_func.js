const userData = require('./login_func')
const User = require('../Models/model')
const bcrypt = require('bcrypt-nodejs');





function check_creds(email, password){
    console.log(email, password)
    return new Promise((resolve, reject) =>{
        User.findOne({ email: email}).then(function(userInfo){
        console.log(userInfo)
            if(userInfo == null){
                reject("No user found")
            }
            else {
                try{
                    const hashed_password = userInfo.password_hash
                    verify = decrypt_check_password(hashed_password, password)
                    if (verify == true){
                        resolve(userInfo)
                    }
                    else if (verify == false){
                        reject("incorrect pwd")
                    }
                }
                catch(err){
                    reject(err)
                }
                
            }
       

      })
  })

}


function decrypt_check_password(hashed_password, password){
    console.log(`hashed_password: ${hashed_password}, password: ${password}`)
    const match_passwords =  bcrypt.compareSync(password, hashed_password);
    if (match_passwords){
        console.log("you have successfully logged in.")
        return true
    }
    else{
        console.log("incorrect password")
        return false
    }
  
}


module.exports= check_creds;
