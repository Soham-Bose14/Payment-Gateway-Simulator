const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "soham",
    database: "fluxpay"
});

con.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      process.exit(1); // Exit the application with an error code
    }
    console.log("Connected to MySQL!");
  });

  con.query('SELECT * FROM user_credentials', (err, results) => {
    if (err) {
      return console.log('Error executing test query:', err);
    }
    return console.log('User Credentials:', results);
});

module.exports = con;