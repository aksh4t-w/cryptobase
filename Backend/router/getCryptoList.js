const express = require('express')
var router = express.Router()
const staticDataController = require('../controller/staticDataController') 

router.get("/", function(req, res){
    if (req.isAuthenticated()) {     
        staticDataController.getCryptoCurrenciesList(function (err, data) {
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

router.get("/cryptoDetails/", function(req, res){
    if (req.isAuthenticated()) {     
        staticDataController.getCryptoDetailsByName(req, function (err, data) {
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

module.exports = router