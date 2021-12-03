var crypto = require("crypto");
var passport = require("passport")
var LocalStrategy = require("passport-local").Strategy;
var dbOperations = require("../models/userOperations")

function passportInit(){
    passport.use(
        new LocalStrategy( {usernameField : "emailId", passwordField : "password"},function (username, password, done) {
            emailId = username
            dbOperations.findUser(emailId, function(err, data){
                if (err != null){
                    console.log("Error while Logging in->")
                    console.log(err)
                    return done(err, false)
                }
                else{
                    if (data != null && data != ""){
                        // User exitst in the database
                        // Get the hash (password), salt and verify
                        
                        isValidUser = validPassword(password, data.password, data.salt)
    
                        if(isValidUser){
                            //console.log("Its a valid user")
                            return done(null, data);
                        }else{
                            return done(null, false);
                        }
                    }else{
                        return done(null, false)
                    }
                }
                
                
            })
          
        })
      );

}



function genPassword(password) {
    var salt = crypto.randomBytes(32).toString("hex");
    var genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
  
    return {
      salt: salt,
      hash: genHash,
    };
}


function validPassword(password, hash, salt) {
    var hashVerify = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    return hash === hashVerify;
}

passport.serializeUser(function (data, done) {
    //console.log(data)

    done(null, data.userTableId);
  });

  
passport.deserializeUser(function (user_emailId, done) {
    dbOperations.findUserByUserTableId(user_emailId, function(err, data){
        if (err != null){
            console.log("Error while Logging in->")
            console.log(err)
            done(err, false)
        }
        done(null, data)
    })
});


exports.passportInit = passportInit
exports.genPassword = genPassword
exports.validPassword = validPassword
