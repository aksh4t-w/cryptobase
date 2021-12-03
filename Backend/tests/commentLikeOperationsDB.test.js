const dbOperations = require("../models/commentData")
var userTableIdVar

//jest.setTimeout(10000);

describe("Test Suite to Test -> set/get Comment , like comment, get likes, get comment Data", ()=>{

    beforeAll(done => {
        try{
            sqlDeleteData = "DELETE FROM Comments"
            sqlParams = []
            dbOperations.db.run(sqlDeleteData, sqlParams, function(err){
                    if (err != null){
                        done(err)
                    }
                    console.log("Done Deleting ")
                    sqlDeleteUserDetails = "DELETE FROM UserDetails"
                    dbOperations.db.run(sqlDeleteUserDetails, [], function(err){
                        if(err != null){
                            done(err)
                        }
                        console.log("Done Deleting User Data")
                    sqlInsertData = "INSERT INTO UserDetails(username, user_emailID, password, salt, dob) "
                    sqlInsertData += " VALUES(?, ?, ?, ?, ?)"
                    sqlParams = ["ABC XYZ", "ABC@XYZ.com", "sdfhsdjkfsdfsf", "sdhfkjiuwed1o2ouw2b", "12-Nov-1992"]

                    dbOperations.db.run(sqlInsertData, sqlParams, function(err){
                        if(err != null){
                            done(err)
                        }
                        console.log("Inserted Data")
                        sqlQuery = "Select userTableId from UserDetails where user_emailID = ?"
                        sqlParams = ["ABC@XYZ.com"]

                        dbOperations.db.get(sqlQuery, sqlParams, function(err, data){
                            if(err != null){
                                done(err)
                            }
                            console.log("Got data -> " + data.userTableId)
                            userTableIdVar = data.userTableId

                            sqlDeleteNewsLikes = "DELETE FROM NewsLikes"
                            sqlParams = []

                            dbOperations.db.run(sqlDeleteNewsLikes, sqlParams, function(err){
                                if(err != null){
                                    done(err)
                                }

                                done()
                            })
                        })

                    })

                    })         
            })
        }catch(err){
            done(err)
        }
    })
    
    test("Positive Test case for Setting Comment Data", done =>{

        try{
            userObj = {
                "userTableId" : userTableIdVar,
                "timeStamp" : "2021-09-10:9:00:00:000",
                "commentData" : "This is great post",
                "ticker" : "BTC",
                "newsURL" : "www.newsOk.com/1212u78ue"
            }
    
            dbOperations.setComment(userObj, function(err, data){
                if (err != null){
                    console.log(err)
                    done(err)
                }
                console.log("Done Setting the comment -> " +  data)
                expect(data).toBe(true)
                done()
            })
        }catch(err){
            done(err)
        }
     
    })

    test("Negative Test case for Setting Comment Data", done =>{

        try{
            userObj = {
                "userTableId" : "0",            // User Table Id doesn't exist so will throw a foreign key error
                "timeStamp" : "2021-09-10:9:00:00:000",
                "commentData" : "This is great post",
                "ticker" : "BTC",
                "newsURL" : "www.newsOk.com/1212u78ue"
            }
    
            dbOperations.setComment(userObj, function(err, data){
               
                expect(data).toBe(false)
                done()
            })
        }catch(err){
            done(err)
        }
     
    })

    test("Positive test case for adding likes to the data", done=>{
        dataObject = {
            "newsURL" : "www.newsOk.com/1212u78ue",
            "userTableId" : userTableIdVar
        }

        dbOperations.addLikes(dataObject.newsURL, dataObject.userTableId, function(err, data){
            if (err != null){
                done(err)
            }

            expect(data).toBe(true)
            done()

        })

    })

    test("Negative test case for adding likes to the data", done=>{
        dataObject = {
            "newsURL" : "www.newsOk.com/1212u78ue",
            "userTableId" : "0"
        }

        dbOperations.addLikes(dataObject.newsURL, dataObject.userTableId, function(err, data){
            
            expect(data).toBe(false)
            done()
        })

    })


})