const dbOperations = require("../models/commentData");
const { db } = require("../models/sqlconnection");

function setCommentForUser(req, callback) {
  // Check for supplied email Id and validate with the session present
  // Check for Comment Data
  // Check Crypto Ticker for which commented
  // Check News URL *** IMP ***

  if (req.body.emailId == "" || req.body.emailId == null) {
    err = "Email Id not present for setting Comment";
    return callback(err, null);
  }
  emailId = req.body.emailId;
  // To check if the correct user is commenting on the data and this is not a falicious commenting
  if (emailId != req.user.user_emailID) {
    err = "Email Id doesn't match the session";
    return callback(err, null);
  }
  if (req.body.ticker == "" || req.body.ticker == null) {
    err = "Crypto Ticker for adding comment not present";
    return callback(err, null);
  }
  ticker = req.body.ticker;
  if (req.body.newsURL == "" || req.body.newsURL == null) {
    err = "News URL for adding comment not present";
    return callback(err, null);
  }
  newsURL = req.body.newsURL;
  if (req.body.commentData == "" || req.body.commentData == null) {
    err = "Comment Data for adding comment not present";
    return callback(err, null);
  }
  commentData = req.body.commentData;
  if (req.body.timeStamp == "" || req.body.timeStamp == null) {
    err = "TimeStamp not present for adding comment not present";
    return callback(err, null);
  }
  timeStamp = req.body.timeStamp;
  dataObj = {
    userTableId: req.user.userTableId,
    emailId: emailId,
    ticker: ticker,
    newsURL: newsURL,
    commentData: commentData,
    timeStamp: timeStamp,
  };
  dbOperations.setComment(dataObj, function (err, data) {
    if (err != null) {
      return callback(err, null);
    }
    return callback(null, data);
  });
}

function getCommentsForNews(req, callback) {
  if (req.body.newsURL == "" || req.body.newsURL == null) {
    err = "News URL not provided";
    return callback(err, null);
  }

  dbOperations.getComments(req.body.newsURL, function (err, data) {
    if (err != null) {
      return callback(err, null);
    }
    return callback(null, data);
  });
}

function incrementLikesForNews(req, callback) {
  if (req.body.newsURL == "" || req.body.newsURL == null) {
    err = "News URL not provided";
    return callback(err, null);
  }

  dbOperations.addLikes(
    req.body.newsURL,
    req.user.userTableId,
    function (err, data) {
      if (err != null) {
        return callback(err, null);
      }
      return callback(null, data);
    }
  );
}

function getLikesForNews(req, callback) {
  if (req.body.newsURL == "" || req.body.newsURL == null) {
    err = "News URL not provided";
    return callback(err, null);
  }

  // Get Array of News URL and respond with all of the NEWS URL
  dbOperations.getLikesForNews(req.body.newsURL, function (err, data) {
    if (err != null) {
      return callback(err, null);
    }
    return callback(null, data);
  });
}

function getUserLikeData(req, callback) {
  if (req.body.newsURL == "" || req.body.newsURL == null) {
    err = "News URL not provided";
    return callback(err, null);
  }

  dbOperations.getIfUserLikedNews(
    req.body.newsURL,
    req.user.userTableId,
    function (err, data) {
      if (err != null) {
        return callback(err, null);
      }

      return callback(null, data);
    }
  );
}

module.exports = {
  setCommentForUser,
  getCommentsForNews,
  incrementLikesForNews,
  getLikesForNews,
  getUserLikeData,
};
