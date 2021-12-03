const express = require('express')
var router = express.Router()
const cryptoUserController = require("../controller/cryptoUserConfigController")


router.get("/get", function(req, res){
    if (req.isAuthenticated()) {     
        cryptoUserController.getFavouritesForUser(req, res, function (err, data) {
          if (err != null) {
            res.json({"message" : err});
          }
          if (data == null){
              //console.log("Got null")
              data = ""
          }
          res.json({"message" : data});
        });

      } else {
        res.status(511);
        console.log("You are not authorised to access -> cryptoUserDetails/get");
        res.send("User is not authorised");
      }
})

router.post("/set", function(req, res){
    if (req.isAuthenticated()) {     
        cryptoUserController.updateFavouritesForUser(req, res, function (err, data) {
            if (err != null) {
                res.json({"message" : err});
              }
            else{
                res.json({"message" : data});
            }
              
        });
        
      } else {
        res.status(511);
        console.log("You are not authorised to access -> cryptoUserDetails/set");
        res.send("User is not authorised");
      }
})




module.exports = router;