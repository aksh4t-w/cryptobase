const passport = require("../controller/passport");
// const { getUserInfo } = require("../controller/userController");
// const { get } = require("../router/loginSubmit");
const db = require("../models/sqlconnection").db

// let db = new sqlite3.Database(
//   "./database/sampleDb.db",
//   sqlite3.OPEN_READWRITE,
//   (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("Connected to the database");
//   }
// );

// Create a user given the inputs
function insertNewUser(userObj, callback) {
  // get the hash of the password
  passwordSalt = passport.genPassword(userObj.password);

  db.get(
    "Select MAX(userTableId) as usertableId from userDetails",
    [],
    function (err, row) {
      if (err != null) {
        return callback(err, null);
      } else {
        maxUserTableId = row.usertableId + 1;
        sqlInsertData =
          "Insert Into userDetails(username, userTableId, user_emailId, password, salt, dob) ";
        sqlInsertData += "Values(?, ?, ?, ?, ?, ?)";

        queryData = [
          userObj.username,
          maxUserTableId,
          userObj.emailId,
          passwordSalt.hash,
          passwordSalt.salt,
          userObj.dob,
        ];
        //console.log(queryData);

        db.run(sqlInsertData, queryData, function (err) {
          if (err != null) {
            return callback(err, null);
          }

          //console.log("Added User with Email Id" + userObj.emailId);
          return callback(null, true);
        });
      }
    }
  );
}

// Check if user Id exists
function checkUserId(emailId, callback) {
  sqlCheckUserId = "Select * from userDetails where user_emailId = ?";
  queryData = [emailId];

  db.get(sqlCheckUserId, queryData, (err, row) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    }

    if (row != null) {
      return callback(null, false);
    } else {
      return callback(null, true);
    }
  });
}

// Get the data of the user

function findUser(emailId, callbackfn) {
  //console.log(userId)
  sqlGetDataFromUser =
    "Select userTableId, user_emailId, password, salt from userDetails where user_emailId = ?";
  queryData = [emailId];

  db.get(sqlGetDataFromUser, queryData, (err, row) => {
    if (err) {
      //console.log(err);
      //throw err;
      return callbackfn(err, null);
    }
    return callbackfn(err, row);
  });
}

function findUserByUserTableId(userTableId, callbackfn) {
  //console.log(userId)
  sqlGetDataFromUser =
    "Select username, userTableId, user_emailID, password, salt, dob from userDetails where userTableId = ?";
  queryData = [userTableId];

  db.get(sqlGetDataFromUser, queryData, (err, row) => {
    if (err) {
      //console.log(err);
      //throw err;
      return callbackfn(err, null);
    }
    //console.log("row output")
    //console.log(row)
    return callbackfn(err, row);
  });
}

// Function to get User Details
function getUserData(userEmailId, callbackfn) {
  // TO DO - Add call the data about the favourite crypto too
  sqlGetDataFromUser =
    "Select username, user_emailID, dob  from userDetails where user_emailID = ?";
  queryData = [userEmailId];

  db.get(sqlGetDataFromUser, queryData, (err, row) => {
    if (err) {
      //console.log(err);
      //throw err;
      return callbackfn(err, null);
    }
    //console.log("row output")
    //console.log(row)
    return callbackfn(null, row);
  });
}

// Update details of the user
function updateUserDetails(userObj, operation, callbackfn) {
  if (operation == "userDetails") {
    sqlUpdateData = "Update userDetails";
    sqlUpdateData += " Set username = ? ,";
    sqlUpdateData += " user_emailId = ? ,";
    sqlUpdateData += " dob = ? ";
    sqlUpdateData += " where user_emailId = ?";

    queryData = [
      userObj.username,
      userObj.emailId,
      userObj.dob,
      userObj.emailId,
    ];

    //console.log(queryData);

    db.run(sqlUpdateData, queryData, function (err) {
      if (err != null) {
        return callbackfn(err, null);
      }
      if (this.changes >= 0) {
        return callbackfn(null, true);
      }
    });
  } else if (operation == "password") {
    // Hash the password again with a salt

    hashSalt = passport.genPassword(userObj.password);

    sqlUpdateData = "Update userDetails";
    sqlUpdateData += " Set password = ? ,";
    sqlUpdateData += " salt = ? ";
    sqlUpdateData += "where user_emailId = ? ";

    queryData = [hashSalt.hash, hashSalt.salt, userObj.emailId];

    db.run(sqlUpdateData, queryData, function (err) {
      if (err != null) {
        return callbackfn(err, null);
      }
      if (this.changes >= 0) {
        return callbackfn(null, true);
      }
    });
  }
}

//Function to delete a user from Database
function deleteUser(emailId, callbackfn) {
  sqlDeleteQuery = "Delete from userDetails";
  sqlDeleteQuery += " where userTableId = ?";

  queryData = [emailId];

  db.run(sqlDeleteQuery, queryData, function (err) {
    if (err) {
      return callbackfn(err, false);
    }
    return callbackfn(err, true);
  });
}

function clearDataForTests(callbackfn){
  sqlDeleteDataFromDataBase = "Delete from UserDetails"
  sqlParams = ["UserDetails"]

  db.run(sqlDeleteDataFromDataBase, [], function (err){
       if (err != null){
           return callbackfn(err, null)
       }    

       return callbackfn(null, true)
  })
}

// Function to change password
// TO DO

exports.findUser = findUser;
exports.checkUserId = checkUserId;
exports.insertNewUser = insertNewUser;
exports.updateUserDetails = updateUserDetails;
exports.findUserByUserTableId = findUserByUserTableId;
exports.db = db;
exports.deleteUser = deleteUser;
exports.getUserData = getUserData;
exports.clearDataForTests = clearDataForTests