const mysql = require("mysql2");

//initialize mysql2
const connect = () => {
    const sqlConnect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "employeeTracker_db",
      });
      
      //database connection
      sqlConnect.connect((err) => {
        if (err) throw err;
        console.log('Database Connected');
      });
}


  module.exports = connect;