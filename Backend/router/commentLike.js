const express = require('express')
var router = express.Router()
const commentLikeController = require("../controller/userCommentLikeDataController")

router.post("/set/comment", function(req, res){
    if (req.isAuthenticated()) {     
        commentLikeController.setCommentForUser(req, function (err, data) {
          if (err != null) {
            res.json({"message" : err});
          }
          else{
            if (data == null){
                //console.log("Got null")
                data = ""
            }
            res.json({"message" : data});
          }
          
        });

      } else {
        res.status(511);
        console.log("You are not authorised to access -> userCommentLike/set/comment");
        res.send("User is not authorised");
      }
})

router.post("/get/comment", function(req, res){
    if (req.isAuthenticated()) {     
        commentLikeController.getCommentsForNews(req, function (err, data) {
          if (err != null) {
            res.json({"message" : err});
          }
          else{
            if (data == null){
                //console.log("Got null")
                data = ""
            }
            res.json({"message" : data});
          }
          
        });

      } else {
        res.status(511);
        console.log("You are not authorised to access -> userCommentLike/get/comment");
        res.send("User is not authorised");
      }
})

router.post("/addLikesForNews", function(req, res){
    if (req.isAuthenticated()) {     
        commentLikeController.incrementLikesForNews(req, function (err, data) {
          if (err != null) {
            res.json({"message" : err});
          }
          else{
            if (data == null){
                //console.log("Got null")
                data = ""
            }
            res.json({"message" : data});
          }
        });

      } else {
        res.status(511);
        console.log("You are not authorised to access -> userCommentLike/addLikesForNews");
        res.send("User is not authorised");
      }
})


router.post("/getLikesForNews", function(req, res){
    if (req.isAuthenticated()) {     
        commentLikeController.getLikesForNews(req, function (err, data) {
          if (err != null) {
            res.json({"message" : err});
          }
          else{
            if (data == null){
                //console.log("Got null")
                data = ""
            }
            res.json({"message" : data});
          }
        });

      } else {
        res.status(511);
        console.log("You are not authorised to access -> userCommentLike/getLikesForNews");
        res.send("User is not authorised");
      }
})

router.post("/getUserLikeData", function(req, res){
  if (req.isAuthenticated()) {     
      commentLikeController.getUserLikeData(req, function (err, data) {
        if (err != null) {
          res.json({"message" : err});
        }
        else{
          res.json({"message" : data});
        }
      });

    } else {
      res.status(511);
      console.log("You are not authorised to access -> userCommentLike/getUserLikeData");
      res.send("User is not authorised");
    }
})



module.exports = router