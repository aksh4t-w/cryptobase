const express = require("express");
var router = express.Router();
var passport = require("passport");
var userController = require("../controller/userController");

router.post("/", function (req, res) {
  //console.log(req.session)
  if (req.isAuthenticated()) {
    // Console

    // Call the controller method to fetch user information
    userController.getUserInfo(req, res, function (err, data) {
      if (err != null) {
        res.send(err);
      }
      res.json(data);
    });
    // res.send("Something wrong happened")
  } else {
    res.status(511);
    console.log("You are not authorised");
    //res.send("User is not authorised");
    res.json({"message" : "User if not authorised"});
  }
});

// router.post("/", function (req, res) {
//   //console.log(req.session)
//   if (req.isAuthenticated()) {
//     // Console

//     // Call the controller method to fetch user information
//     userController.getUserInfo(req, res, function (err, data) {
//       if (err != null) {
//         res.send(err);
//       }
//       res.json(data);
//     });
//     // res.send("Something wrong happened")
//   } else {
//     res.status(511);
//     console.log("You are not authorised");
//     res.send("User is not authorised");
//   }
// });

router.get("/", function (req, res) {
  console.log(req.session);
  if (req.isAuthenticated()) {
    userController.getUserInfo(req, res, function (err, data) {
      if (err != null) {
        res.send(err);
      }

      res.json(data);
    });
    // res.send("Something wrong happened")
  } else {
    console.log("You are not authorised");
    //res.send("User is not authotised");
    res.json({"message" : "User if not authorised"});
  }
});

module.exports = router;
