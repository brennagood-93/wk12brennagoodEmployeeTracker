const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "Brenna",
    password: "Brenna",
    database: "emptracker_db",
});

connection.connect();

module.exports = connection;