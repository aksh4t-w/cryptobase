const dbOperations = require("../models/newsStoreOperations")


function setNewsDataForUser(req, callback){
    // Check for the data sent from the user
    // emailId --> Used to check the if the user requesting to the data is actually the user who is authenticated
    // newsURL 
    // news_cryptoTickers -> Optional field 
    // news_shortData -> Optional field

    if (req.body.emailId == "" || req.body.emailId == null){
        err = "Email Id not present for setting Comment" 
        return callback(err, null)   
    }
    emailId = req.body.emailId
    // To check if the correct user is commenting on the data and this is not a falicious commenting 
    if (emailId != req.user.user_emailID){
        err = "Email Id doesn't match the session"
        return callback(err, null)
    }

    if (req.body.newsURL == "" || req.body.newsURL == null){
        err = "News URL for adding comment not present"
        return callback(err, null)
    }
    newsURL = req.body.newsURL

    ticker = ""
    if (req.body.ticker != "" || req.body.ticker != null){
        ticker = req.body.ticker
    }

    newsData = ""
    if (req.body.newsData != "" || req.body.newsData != null){
        newsData = req.body.newsData
    }


    dataObject = {
        emailId : emailId,
        userTableId : req.user.userTableId,
        newsURL : newsURL,
        ticker : ticker,
        newsData : newsData
    }

    dbOperations.storeNewsDataInDB(dataObject, function(err, data){
        if(err != null){
            return callback(err, null)
        }

        return callback(null, data)
    })

}


function getNewsDataForUser(req, callback){
    if (req.body.emailId == "" || req.body.emailId == null){
        err = "Email Id not present for setting Comment" 
        return callback(err, null)   
    }
    emailId = req.body.emailId
    // To check if the correct user is commenting on the data and this is not a falicious commenting 
    if (emailId != req.user.user_emailID){
        err = "Email Id doesn't match the session"
        return callback(err, null)
    }

    if (req.body.newsURL == "" || req.body.newsURL == null){
        err = "News URL for adding comment not present"
        return callback(err, null)
    }
    newsURL = req.body.newsURL

    dbOperations.getNewsDataInDB(newsURL, req.user.userTableId, function(err, data){
        if (err != null){
            return callback(err, null)
        }

        return callback(null, data)
    })


}

module.exports = {setNewsDataForUser, getNewsDataForUser}