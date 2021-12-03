// Create a express server and point things to all the routes that we ought to take
//Initial Basic Routes
///// User Action Related
//Login
//Logout
//CreateUser
//DeleteUser
//GetUserData
//UpdateUserData
////// Application Specific
/// cryptoUserConfigController
//SetFavourites
//GetFavourites
/// cryptoUserCommentLikeController
//SetCommentsForNewsURL
//GetCommentsForNewsURL
//AddLiketoNewsURL
/// staticDataController
//SendListOfAllCryptos
//getCryptoDetailsByName


// Generic configuration
var PORT = 1337;
var cookie_Max_Age_Time = 1000* 60 * 10; // 10 Minutes
var MINPASSWORDLENGTH = 8;
var sessionSecretKey = "secret"
var sessionsDb = "sessions"


 require("dotenv").config()

// Replace the envrionement's default values used for generic configuration with that from the .env file
PORT = process.env.port == "" || process.env.port == null ? PORT : process.env.port
cookie_Max_Age_Time = process.env.cookieMaxAge == "" || process.env.cookieMaxAge == null ? parseInt(cookie_Max_Age_Time) : parseInt(process.env.cookieMaxAge)
MINPASSWORDLENGTH = process.env.minPasswordLength == "" || process.env.minPasswordLength == null ? MINPASSWORDLENGTH : process.env.minPasswordLength
sessionSecretKey = process.env.secret == "" ||  process.env.secret == null ? sessionSecretKey : process.env.secret
sessionsDb = process.env.sessionsDb == "" || process.env.sessionsDb == null ? sessionsDb : process.env.sessionsDb

// Comment out this portion ... Only used for debugging
console.log("Configs used for server ---->")
console.log("PORT -> " + PORT)
console.log("Cookie Max Age -> " + cookie_Max_Age_Time)
console.log("Minimum Password Length -> " + MINPASSWORDLENGTH )
console.log("Session Key -> " + sessionSecretKey)
console.log("sessionsDb -> " + sessionsDb)

const express = require("express");
const sessionsObj = require("express-session");
const passport = require("passport");
const app = express();
const cors = require("cors");
var sessionStore = require("connect-sqlite3")(sessionsObj)

// user Defined
const dbObject = require("./models/sqlconnection");

// User Details Specific imports
const loginSubmit = require("./router/loginSubmit");
const logoutRoute = require("./router/logout");
const createUser = require("./router/createUser");
const dashboard = require("./router/dashboard");
const updateUser = require("./router/updateUser");
const deleteUser = require("./router/deleteUser");
const getUserProfileData = require("./router/getUserProfileData");

// Applications specific 
const cryptoUserDetails = require("./router/cryptoFavourites")
//const crytoDataDetails = require("./router/getCryptoList")
const userCommentLike = require("./router/commentLike")
const userNewsStore = require("./router/userNewsStore")


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors())

app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: ["http://localhost:3000", "https://cryptobasefrontend.herokuapp.com", "http://cryptobasefrontend.herokuapp.com"],
  })
); 


app.use(
  sessionsObj({
   
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: cookie_Max_Age_Time
    },
    store : new sessionStore({db : sessionsDb + ".db", dir : "./database"})
  })
);

// Add the secure and sameSite paramaters if enviroment is PROD
if (process.env.ENV == "PROD"){
  console.log("Configuring Prod Environment .......")
  app.set('trust proxy', 1)
  app.use(
    sessionsObj({
     
      secret: sessionSecretKey,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: cookie_Max_Age_Time,
        secure: true,
        sameSite: 'none'
      },
      store : new sessionStore({db : sessionsDb + ".db", dir : "./database"})
    })
  );
}

require("./controller/passport").passportInit();

app.use(passport.initialize());
app.use(passport.session());

app.use("/login", loginSubmit);
app.use("/logout", logoutRoute);
app.use("/createUser", createUser);
app.use("/dashboard", dashboard);
app.use("/updateUser", updateUser);
app.use("/deleteUser", deleteUser);
app.use("/getUserProfileData", getUserProfileData);

//Application specific routes
app.use("/cryptoUserDetails", cryptoUserDetails);     // All GOOD
//app.use("/cryptoDataDetails", crytoDataDetails);    // Removing route as not being used
app.use("/userCommentLike", userCommentLike)
// Route to store the news Item to be fetched at later time
app.use("/userNewsViewedData", userNewsStore)

var server = app.listen(process.env.PORT, () => {
  console.log("Server started at ", process.env.PORT);
});

process.on("SIGINT", () => {
  console.info("SIGINT signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    console.log("Closing database connection");
    dbObject.db.close();
  });
});

exports.MINPASSWORDLENGTH = MINPASSWORDLENGTH

