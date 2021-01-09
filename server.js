const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '81818181',
    database: 'tracker_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' +connection.threatdId);
    afterConnection();
});

afterConnection = () => {
    connection.query('SELECT * FROM employees', function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};