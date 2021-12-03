const express = require('express')
var router = express.Router()

const userNewsDataController = require("../controller/newsDataController")

router.post("/setNewsData", function(req, res){
    if (req.isAuthenticated()) { 
        // call the controller to store the data
        userNewsDataController.setNewsDataForUser(req, function(err, data){
            if (err != null){
                console.log(err)
                res.json({"message" : err})
            }else{
                res.json({"message" : data})
            }
        })

    }else{
        res.status(511);
        console.log("You are not authorised to access -> userCommentLike/set/comment");
        res.send("User is not authorised");
    }
})

router.post("/getNewsData", function(req, res){
    if (req.isAuthenticated()) { 
        // call the controller to get the data
        userNewsDataController.getNewsDataForUser(req, function(err, data){
            if (err != null){
                res.json({"message" : err})
            }else{
                res.json({"message" : data})
            }
        })

    }else{
        res.status(511);
        console.log("You are not authorised to access -> userCommentLike/set/comment");
        res.send("User is not authorised");
    }
})

module.exports = router