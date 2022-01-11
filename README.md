# CryptoBase

## Starting the Backend Server

Please add a .env file and copy and paste the below configuration in "Backend" folder

```
port=1337
cookieMaxAge=3600000
minPasswordLength=8
maxPasswordLength=100
secret="8812nkj12891nkfjhsdfk23"
dbName="cryptoBaseDB"
sessionsDb=sessions

```

```
$ cd Backend
$ npm i
$ npm start

```

## Starting the Frontend Server

```
$ cd Frontend
$ npm i
$ npm start

```

### While installing dependencies for frontend , if you get any issues that are specific to OS, system architecture, please run the below commands,

```
$ cd Frontend
$ npm i -f
$ npm start

```

## Guide to accessing web application

1. The application launches at http://localhost:3000/ on the default browser.
2. Click on 'SignUp' and create the user by entering the appropriate details.
3. If the user is created, you will be redirected to the sign in page else an error will be shown in the sign up box.
4. Now with those credentials, login into the website.
5. The news for your favourite crypto currencies (hard coded as of now) will be displayed under their respective names.
6. Clicking on the title of crypto will open a new page which displays its chart over 500 days. Another chart can be selected using the dropdown button below the chart.
7. You can see your profile by clicking on the 'Profile' button on the navbar.
8. Profile page allows you to update your name and delete your account by clicking the appropriate buttons.

## Unit testing with JEST and plan ahead

Details about unit testing for critical modules is given below, to run the unit test, please run the below command

```

$ npm run test

```

#### Password Related Tests

##### Password Length Strength Test

1. Normal Usage - This tests verifies if the passwordlength is permissible when a password with permissible length is provided. For this application password with length > 8 are considered permissible. This test is named as "Positive Test Case for Correct Input"

2. Erroneuos Usage - This test verifies the functionality of password lenght checker in case the password lenght is < 8 . This test is named as "Negative Test case for Incorrect Input" . Here password with length = 4 is passed and checked if the function returns 'false' which indicates the correctness of this test

##### Password Hashing Related Test

1. Normal Usage - This tests verifies for the given password, a hash and salt is generated and does verify this by validating the password with the salt by rehashing and checking the generated hash

2. Negative Usage - In this test, for the password the salt for the password is changed and then the password and salt combinations are revalidated . Failure is to be expected in this test

#### CRUD operations related Units Tests

##### Create User Test

For this test , the sample user object is created and inserted into the database . The response for the function is checked in this case

##### Get Data For Test

For this test, the sample user created previous is used and data for the same is pulled from DB and the object returned is checked

##### Update Data for user

For this test , data is updated for a user and the data which is updated is checked by querying the data from the DB and checking the fields that were supposed to change

##### Delete User

For this test , user's email ID is provided to be deleted from the data. The response from the function/ DB is checked for the test

### Plan Ahead (Updated)

Going ahead we expect to check and perform unit testing for

1. Checking the Users Detail Inputs --> COMPLETED
2. Checking the password hashing functionality --> COMPLETED
3. Checking functions related to database operations --> COMPLETED
4. Authentication and Authorisation Tests

## Structure of project

The project is divided into 3 parts,

1. Frontend - in the folder Frontend
2. Backend - in the folder Backend
3. Database - in the folder Database

Frontend is made in React JS and backend in NodeJS ( with Express.js ) .Both frontend and backend server need to be started. Before starting both frontend and backend servers please install the appropriate dependencies.

1. Dependencies for Backend - NodeJS, npm and packages inside the package.json file
2. Dependencies for Frontend - ReactJS, React Context API, MaterialUI

Tools and IDEs - Visual Studio Code, Postman, SQLiteStudio

## Storage of User Details

Whenever a new user is created, its details (username, emailID, date of birth, password) is stored in the SQLite based database which is located in "./Backend/database/crytobaseDB.db". Passwords are hashed with a salt and the hash along with the salt is stored in the database.

## Tables used in Project

(Updated)
Tables used and brief usage

1. UserDetails - Store the Users Data for login and auth
2. Comments - Store the comments made by the user
3. CryptoFavourites - Store the favourites for crypto currencies
4. NewsItems - Storage of News Items (used if user wants to view, his recently watched news / his activity)
5. NewsLikes - Stores the likes by each user

The database can be accessed from the CLI provided by SQLite or with a user friendly software called SQLite Studio

#### Sessions Table

All the session related data is used in the session.db table . The configuration for the same in 'index.js' file.

#### Testing Table

All the unit test are made with a replica of "cryptoBaseDB.db" database called "testDB.db". Before any operation related to database , all the data is erased . Please take a look at 'userOperationDB.test.js' file for the same

## ERD Diagram

<img  src="ERD_Diag.jpg" >

## API's Used

### 1. Mediastack

  <img src="mediastack.png" height="330px" width="1000px">
  
  This API is used to fetch the news for the various crypto currencies based on the given keywords to be displayed to the users. This API provides 500 free requests on the free plan.
  
### 2. Coingecko

  <img src="coingecko.png" height="270px" width="900px">

This API is used to fetch the historical market data of crypto currencies which is later used to plot their chart. It is a free to use API with no limit on the number of requests.

## Charting Library - Lightweight charts (Tradingview)

The library used here is kaktana-react-lightweight-charts which is a modified version of the standard lightweight charts provided by tradingview, to work with react. This library makes use of price and time data to plot various types of charts like line chart, candlestick chart, area series chart etc. We have used the area series chart using the data fetched from coingecko's API for a given crypto.
The chart displayed here gives us important information about the crypto currencies' price over a span of 500 days. Users can see the chart to understand how the price has moved in the past days, perform technical analysis to make investment decisions in that crypto.
