// Take config's from some config file and create a connection to the SQL server
// Export the connection object
const sqlite3 = require("sqlite3").verbose();
const dbName = process.env.dbName == "" ||  process.env.dbName == null ? "testDB" : process.env.dbName//"cryptoBaseDB" //process.env.dbName == "" ||  process.env.dbName == null ? "sampleDB" : process.env.dbName

let db = new sqlite3.Database(
    "./database/" + dbName + ".db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to the database " + dbName);
    }
);

exports.db = db
