
const db = require("./sqlconnection").db

function storeNewsDataInDB(dataObj, callbackfn){
    db.get("PRAGMA foreign_keys = ON")
    sqlCheckIfNewsURLUserExists = "Select COUNT(*) as count from NewsItems where news_URL = ? and news_userTableId = ?"
    sqlParams = [dataObj.newsURL, dataObj.userTableId]

    db.get(sqlCheckIfNewsURLUserExists, sqlParams, function(err, data){
        if(err != null){
            return callbackfn(err, null)
        }

        if (data.count != 0){
            // Update the current record
            sqlUpdateData = "UPDATE NewsItems "
            sqlUpdateData += " SET news_cryptoTickers = ? ,"
            sqlUpdateData += " news_shortData = ? "
            sqlUpdateData += " WHERE news_URL = ? AND news_userTableId = ?"

            sqlParams = [dataObj.newsURL, dataObj.userTableId]

            db.run(sqlUpdateData, sqlParams, function(err){
                if (err != null){
                    return callbackfn(err, null)
                }

                return callbackfn(null, true)
            })
            
        }
        else{
            sqlInsertData = "INSERT INTO NewsItems(news_cryptoTickers, news_URL, news_shortData, news_userTableId)"
            sqlInsertData += "VALUES(?, ?, ?, ?)"

            sqlParams = [dataObj.ticker, dataObj.newsURL, dataObj.newsData, dataObj.userTableId]

            db.run(sqlInsertData, sqlParams, function(err){
                if(err != null){
                    return callbackfn(err, null)
                }

                return callbackfn(null, true)
            })
        }

    })
}

function getNewsDataInDB(newsURL, userTableId, callbackfn){
    sqlGetNewsData = "Select * from NewsItems where news_URL = ? and news_userTableId = ?"
    sqlParams = [newsURL, userTableId]

    db.all(sqlGetNewsData, sqlParams, function(err, data){
        if(err != null){
            return callbackfn(err, null)
        }

        return callbackfn(null, data)
    })
}


module.exports = {storeNewsDataInDB, getNewsDataInDB}