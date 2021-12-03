const PASSWORDLENGTH =  process.env.minPasswordLength == null || process.env.minPasswordLength == "" ? 8 : parseInt(process.env.minPasswordLength) 
const MAXPASSWORDLEN = process.env.maxPasswordLength == null || process.env.maxPasswordLength == "" ? 50 : parseInt(process.env.maxPasswordLength)
const passwordVal = require("password-validator")


const listOfCommonPasswords = ["Password@123", "Pass@12345", "Qwerty@123"] 
var schemaForPassword = new passwordVal()

schemaForPassword
.is().min(PASSWORDLENGTH)
.is().max(MAXPASSWORDLEN)
.has().uppercase(1)
.has().lowercase(1)
.has().symbols(1)
.has().digits(1)
.is().not().oneOf(listOfCommonPasswords)

function checkIfAllDetailsPresent(req, callback){
    // if (req.body.userId == null || req.body.userId == ''){
    //     err = "UserId is empty "
    //     callback(err, null)
    // }
    //userId = req.body.userId
    if (req.body.emailId == null || req.body.emailId == ''){
        err = "Email ID is empty "
        return callback(err, null)   
    }
    emailId = req.body.emailId
    // Check if email Id is in correct form
    // Trim the white space 
    emailId = emailId.trim()
    if (req.body.username == null || req.body.username == ''){
        err = "User Name is empty"
        return callback(err, null)
    }
    username = req.body.username
    if (req.body.password == null || req.body.password == ''){
        err = "Password is empty"
        return callback(err, null)
    }
    password = req.body.password

    
    if(req.body.dob == null || req.body.dob == ''){
        err = "Dob is empty"
        return callback(err, null)
    }
    dob = req.body.dob


    dataObj = {
        // userId : userId,
        emailId : emailId,
        username : username,
        password : password,
        dob : dob 
    }
    return callback(null, dataObj)
}

function checkPasswordLength(data){
    if(data.password.length < PASSWORDLENGTH){
        return false
    }

    return true
}

function validatePassword(userPassword, callback){
    if (schemaForPassword.validate(userPassword) == true){
        return callback(null, true)
    }else{
        return callback(schemaForPassword.validate(userPassword, {details : true}), false)
    }
}

exports.checkIfAllDetailsPresent = checkIfAllDetailsPresent
exports.checkPasswordLength = checkPasswordLength
exports.validatePassword = validatePassword