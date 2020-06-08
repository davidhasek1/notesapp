const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_app',
    password: 'davidhasek'
});

module.exports = pool.promise();