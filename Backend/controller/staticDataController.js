const dbOperations = require("../models/staticDataOperations")

function getCryptoCurrenciesList(callback){

    console.log(dbOperations)
    dbOperations.getDBCryptoList(function(err, data){
        if(err != null){
           return callback(err, null)
        }
        return callback(null, data)
    })
}

function getCryptoDetailsByName(req, callback){
    if(req.query.ticker == "" || req.query.ticker == null){
        return callback("Ticker value not supplied", null)
    }
    //console.log(req.query.ticker )
    dbOperations.getCryptoByName(req.query.ticker, function(err, data){
        if(err != null){
            return callback(err, null)
        }
        return callback(null, data)
    })

}

module.exports = {getCryptoCurrenciesList, getCryptoDetailsByName}