const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: './db/tracker.db',
    database: 'tracker'
});