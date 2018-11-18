# authorization-restful-api


## Language/framework used
* Node js 
* Express js 

## API Documentation
https://documenter.getpostman.com/view/3646939/RzZDgw3G

## Features
* User can't register twice with the same email ID
* If the user is allready logged in and tries to hit the login API again, it says "You are already logged in"
* Hashes user Password with salt
* Session management
* User can delete his account and then gets immediately logged out.
* If the user tries to login after he has deleted his account, API respond with "This account is deleted."
* User can recover his account if he inputs correct email and password. 
* Cookie session last for 1 day. 


## Instalation 
* npm install 
* Input your mongo db credentials in __/config/keys__ file 
