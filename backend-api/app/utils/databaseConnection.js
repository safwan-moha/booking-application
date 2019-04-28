const mysql = require('mysql');
const { dbParams } = require('./config');

const db = mysql.createConnection(dbParams);

db.connect(function (err) {
    if (err) {
        console.error('Mysql Error: ' + err.stack);
        return;
    }
    console.log("Mysql Connected!");
});

module.exports = db;