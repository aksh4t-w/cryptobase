// For handling every request and doing validations , etc
var dbOperations = require("../models/userOperations")
var helper = require("../helper/helperFunction")

module.exports = {
    // Start of login Submit Event
    // ********* This is currently not in use **********
    loginSubmitEvent : (req, res, callback)=>{
        userName = req.body.username
        password = req.body.password
        // console.log(userName)
        // console.log(password)
        // TODO Do a regex check to see if username and password are only alphanumeric ( For SQL injection)
        
        // TODO Call the functions in passport js to get the crypto hash of password

        // Call the db get user operations and authenticate
        dbOperations.findUser(userName, function(err, data){
            if (data != null){
                return callback(null, data)
            }else if (err != null){
                return callback(err, null)
            }
        })
       // console.log(data)
       

    },
    // End of login submit event

    // Start of create user Function
    createUser : (req, res, callback) => {
        helper.checkIfAllDetailsPresent(req, function(err, dataObj){
            if(err != null){
                return callback(err, null)
            }
            
            if(!helper.checkPasswordLength(dataObj)){
                err = "Password Length less than 8"
                return callback(err, null)
            }

            helper.validatePassword(dataObj.password, function(err, isValid){
                if (err != null){
                    return callback(err, null)
                }

                if (isValid == true){
                    dbOperations.checkUserId(dataObj.emailId, function(err, data){
                        if (err != null){
                            return callback(err, null)
                        }
                        if (data != null){
                            if (data == false){
                                //console.log("User Id is not unique")
                                return callback("User Email Id Already Exists", null)
                            }else if(data == true){
                               // Check for the password policy 
                               // Then call the db function to insert the user credentials
                               dbOperations.insertNewUser(dataObj, function(err, data){
                                   if (err != null){
                                       return callback(err, null)
                                   }
                                   if (data != null){
                                       if (data == true){
                                           return callback(null, true)
                                       }
                                   }
                               })
                            }
                        }
                    })
                }

            })
        })
       

    },
    // End of Create User Function 

    // Start of Update user Details 
    updateUser : (req, res, callback)=>{
        // Find out if the user Exists 
        // Check if all fields are present so that u accidentally don't do any thing useless
        
        // Adding this step as in update user route , Password won't be transfered
        if (req.body.password == null || req.body.password == ''){
            req.body.password = "dummy"
        }

        helper.checkIfAllDetailsPresent(req, function(err, dataObj){
            if (err != null){
               return callback(err, null)
            }
            dbOperations.checkUserId(dataObj.emailId, function(err, data){
                if (err != null){
                    return callback(err, null)
                }
                if (data != null){
                    if (data == false){
                        console.log("calling update user function inside controller")
                        dbOperations.updateUserDetails(dataObj, "userDetails",function(err, isSuccess){
                            if(err != null){
                                return callback(err, null);
                            }
                            if (isSuccess){
                                console.log("User Data successfully changed");
                                return callback(null, isSuccess)
                            }
                        })
                    }else if(data == true){
                        err = "User Email id is not correct"
                        return callback(err, null)
                    }
                }        
            })
        })

    },
    // End of update user function

    // Start of update user password details 
    updateUserPassword : (req, res, callback)=>{
        // Find out if the user Exists 
        // Check if all fields are present so that u accidentally don't do any thing useless
        
        // Adding this step as in update user route , Password won't be transfered
        if (req.body.password == null || req.body.password == ''){
            err = "Password Field not set"
            return callback(err, null)
        }
        passwordField = req.body.password

        if(helper.checkPasswordLength({password: passwordField}) == false){
            return callback("Password Length Less than 8", null)
        }

        if (req.body.emailId == '' || req.body.emailId == ''){
            err = "Email Id Field not set"
            return callback(err, null)
        }
        emailIdField = req.body.emailId 
        dbOperations.checkUserId(emailIdField, function(err, data){
            if (err != null){
                return callback(err, null)
            }
            if (data != null){
                if (data == false){
                    dataObj = {
                        "password" : passwordField,
                        "emailId" : emailIdField
                    }
                    dbOperations.updateUserDetails(dataObj, "password", function(err, isSuccess){
                        if(err != null){
                            return callback(err, null);
                        }
                        if (isSuccess){
                            console.log("Password successfully changed");
                            return callback(null, isSuccess)
                        }
                    })
                }else if(data == true){
                    err = "User Email id is not correct"
                    return callback(err, null)
                }
            }        
        })

    },
    // End of update user password function



    //Start of Delete Function
    deleteUser : (req, res, callback)=>{
        // Get the user ID and delete the user from the database
        // Req object will contain the email Id of the person 
        // Search for the same in the user Details Table and get the userTableId 
        if (req.body.emailId == "" || req.body.emailId == null){
            err = "emailId not supplied for deleting the user"
            return callback(err, null)
        } 
        emailIdForDeletion = req.body.emailId

        // Check if the email Id exits in the the Db 
        dbOperations.findUser(emailIdForDeletion, function(err, data){
            if(err != null){
                return callback(err, null)
            }

            // Once u get the data 
            if (data != "" && data != null){
                req.logout()
                dbOperations.deleteUser(data.userTableId, function(err, data){
                    if(err){
                        return callback(err, null)
                    }
                    
                    return callback(null, data)

                })
            }else{
                err = "User email Id not found in the data base"
                return callback(err, null)
            }
        })
    },
    // End of delete Function

    //Start of get user function
    getUserInfo : (req, res, callback)=>{
        console.log("calling db opers")
        dbOperations.findUserByUserTableId(req.user.userTableId, function(err, data){
            if(err != null){
                return callback(err, null)
            }
            senderObj = {
                "username" : data.username,
                "emailId" : data.user_emailID,
                "dob" : data.dob 
            }
          
            return callback(null, senderObj)
        })
    },
    // End of delete user function

    // Function to get User Profile data
    getUserProfileData : (req, res, callback) =>{
        // Check if the user exists from the email ID 
        if (req.body.emailId == "" || req.body.emailId == null){
            err = "Email Id not supplied"
            return callback(err, null)
        }
        emailIdField = req.body.emailId

        dbOperations.checkUserId(emailIdField, function(err, data){
            if(err){
                return callback(err, null)
            }

            if (data != null){
                if (data == false){
                    dbOperations.getUserData(emailIdField, function(err, data){
                        if(err != null){
                            return callback(err, null);
                        }
                        
                        return callback(null, data)
                    })
                }else if(data == true){
                    err = "User Email id is not correct"
                    return callback(err, null)
                }
            } 

            
        })
    }



};