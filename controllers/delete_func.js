const userData = require('./login_func')
const User = require('../Models/model')


function find_and_update(email){
    User.findOneAndUpdate({ email: email}, {deleted:true}).then(function(userInfo){
        console.log(userInfo)
    })
    .catch(function(err){
        console.log(err) 
    })
}





function if_deleted_account_login(email){
    return new Promise((resolve, reject) =>{
        User.findOne({ email: email}).then(function(userInfo){
            console.log(userInfo)
            
            if (userInfo == null ){
                reject("User doesn't exist")
            }
            else if (userInfo.deleted == true){
                reject("Account deleted")
            }
            else if (userInfo.deleted == false){
                resolve("Account exist")
            }

        })
    })
}


module.exports={if_deleted_account:if_deleted_account_login, find_and_update:find_and_update}