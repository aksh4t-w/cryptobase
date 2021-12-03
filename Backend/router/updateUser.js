const express = require('express')
var router = express.Router()
var userController = require("../controller/userController")

router.post("/", function(req, res, next){

    if(req.isAuthenticated()){

        userController.updateUser(req, res, function(err, data){
            if(err != null){
                console.log("error occured")
                console.log(err)
                res.json({"message" : err})
            }
            else{
                msg = {"message" : data}   
                console.log("sending updates successfully message") 
                res.json(msg)
            }
           
        })
    }else{
        msg = {"message" : "User not authorised"}
        res.json(msg)
    }

})

router.post("/password", function(req, res, next){

    if(req.isAuthenticated()){

        
        userController.updateUserPassword(req, res, function(err, data){
            if(err != null){
                res.json({"message" : err})
            }
            else{
                msg = {"message" : data}    
                res.json(msg)
            }
           

        })
    }else{
        msg = {"message" : "User not authorised"}
        res.json(msg)
    }

})

module.exports = router;