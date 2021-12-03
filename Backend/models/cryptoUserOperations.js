const db = require("../models/sqlconnection").db

function getUserFavourites(userTableId, callbackfn){
    sqlGetFavourites = "Select crypto_ticker from CryptoFavourites where crypto_userTableId = ? "
    sqlParams = [userTableId]

    db.get(sqlGetFavourites, sqlParams, function(err, data){
        if (err != null) {
            return callbackfn(err, null)
        }

        return callbackfn(null, data)

    })
}

function setUserFavouriteTicker(userTableId, tickers, callbackfn){
    // Check if data is present already
    sqlCheckFavourites = "Select COUNT(*) as count from CryptoFavourites where crypto_userTableId= ?"
    sqlParams = [userTableId]

    db.get(sqlCheckFavourites, sqlParams, function(err, data){
        if (err != null) {
            return callbackfn(err, null)
        }
        if (data.count > 0){
            db.get("PRAGMA foreign_keys = ON")
            sqlUpdateFavourites = "Update CryptoFavourites"
            sqlUpdateFavourites += " set crypto_ticker = ?"
            sqlUpdateFavourites += " where crypto_userTableId = ?"

            sqlParams = [tickers, userTableId]

            db.run(sqlUpdateFavourites, sqlParams, function(err){
                if (err != null){
                    console.log("Error while updating")
                    console.log(err)
                    return callbackfn(err, false)
                }

                return callbackfn(null, true)
            })
        }
        else {
            db.get("PRAGMA foreign_keys = ON")
            sqlInsertFavourites = "Insert into CryptoFavourites(crypto_userTableId, crypto_ticker)"
            sqlInsertFavourites += " Values(?, ?)"

            sqlParams = [userTableId, tickers]

            db.run(sqlInsertFavourites, sqlParams, function(err){
                if (err != null){
                    return callbackfn(err, false)
                }

                return callbackfn(null, true)
            })

        }

    })

}


module.exports = {getUserFavourites, setUserFavouriteTicker}


