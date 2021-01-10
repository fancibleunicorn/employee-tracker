const mysql = require('mysql2');
const cTable = require('console.table');

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
    console.log('connected as id ' +connection.threadId);
    viewDepartments();
});

// View all departments (names and department ids)
viewDepartments = () => {
    connection.query('SELECT * FROM departments', function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

// View all roles (job title, role id, the department that role belongs to, and the salary for that role)
viewRoles = () => {
    connection.query('SELECT roles.id, title, salary, department FROM roles LEFT JOIN departments ON roles.department_id = departments.id', function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

// View all employees (employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to)
viewEmployees = () => {
    connection.query('SELECT employees.id, employees.first_name, employees.last_name, title, salary, CONCAT(m.first_name, " ", m.last_name) AS manager  FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees m ON m.id = employees.manager_id', function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
}





// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 