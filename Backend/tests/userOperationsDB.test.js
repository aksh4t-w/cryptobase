
const dbOperations = require("../models/userOperations")

describe("Tests for user CRUD operatiosn ", ()=>{

    afterAll(done =>{
        try{
            dbOperations.clearDataForTests(function(err, data){
                if (data == true){
                    console.log("Cleared Data for doing tests next time")
                    done()
                }
            })
        }catch(err){
            done(err)
        }
       
    })

     test("Test for Create Operation", done =>{

        try{
            userObj = {
            
                "username" : "XYZ TEST",
                "dob" : "10-19-2000",
                "emailId" : "XYZ@gmail.com",
                "password" : "password@123" 
            }

            dbOperations.insertNewUser(userObj, function(err, data){
                expect(data).toBe(true)
                done()
            })
        }catch(err){
            //console.log(err)
            done(err)
        }
        
    })

    test("Test for getting data from the database", done =>{

        try{
            userObj = {
                "emailId" : "XYZ@gmail.com" 
            }

            dbOperations.getUserData(userObj.emailId, function(err, data){
                userObj2 = {
                    username: 'XYZ TEST',
                    user_emailID: 'XYZ@gmail.com',
                    dob: '10-19-2000'
                  }
                expect(data).toEqual(userObj2)
                done()
            })
        }catch(err){
            //console.log(err)
            done(err)
        }
        
    })


    test("Test for updating the details for the user", done =>{

        userObj = {
            "username" : "XYZ ABC",
            "dob" : "10-19-2000",
            "emailId" : "XYZ.U@gmail.com",
            "password" : "password@123" 
        }

        try{
            dbOperations.insertNewUser(userObj, function(err, data){
                //console.log(data)
                expect(data).toBe(true)
    
                userObj = {
                    "username" : "XYZ TEST123",
                    "dob" : "10-19-2000",
                    "emailId" : "XYZ.U@gmail.com"
                }
                
                try{
                    dbOperations.updateUserDetails(userObj, "userDetails", function(err, data){
                        expect(data).toBe(true)
                        dbOperations.getUserData(userObj.emailId, function(err, data){
                            expect(data.username).toBe(userObj.username)
                            // Testing to check if any random email id changes any things in database
                            userObj.emailId = "random@gma.com"
                            dbOperations.updateUserDetails(userObj, "userDetails", function(err, data){
                                expect(data).toBe(true)
                                done()
                            })
        
                        })
                    })

                    // Negative Test Case for Updating the data
                   
                }catch(err){
                    done(err)
                }
                
            })
    
        }
        catch(err){
            done(err)
        }
        
        
    })

    // Test for deleting the user from the database 
    test("Testing for deleting the user in userDetails Table", done=>{

        try{
            userObj = {
                "emailId" : "XYZ.U@gmail.com" 
            }
    
            dbOperations.deleteUser(userObj.emailId, function(err, data){
                expect(data).toBe(true)
                done()
            })

        }
        catch(err){
            done(err)
        }
        

    })


})
