const express = require('express')
var router = express.Router()
var userController = require("../controller/userController")

router.post("/", function(req, res, next){

    if(req.isAuthenticated()){
        userController.getUserProfileData(req, res, function(err, data){
            if(err){

                res.json({"message" : err}   )
            }
            msg = {"message" : data}    
            res.json(msg)

        })
    }else{
        msg = {"message" : "User not authorised"}
        res.json(msg)
    }

})

module.exports = router;