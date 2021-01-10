const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const logo = `
#######                                                 
#       #    # #####  #       ####  #   # ###### ###### 
#       ##  ## #    # #      #    #  # #  #      #      
#####   # ## # #    # #      #    #   #   #####  #####  
#       #    # #####  #      #    #   #   #      #      
#       #    # #      #      #    #   #   #      #      
####### #    # #      ######  ####    #   ###### ###### 
                                                        
#######                                                 
   #    #####    ##    ####  #    # ###### #####        
   #    #    #  #  #  #    # #   #  #      #    #       
   #    #    # #    # #      ####   #####  #    #       
   #    #####  ###### #      #  #   #      #####        
   #    #   #  #    # #    # #   #  #      #   #        
   #    #    # #    #  ####  #    # ###### #    # 
`

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '81818181',
    database: 'tracker_db'
});

// View all departments (names and department ids)
viewDepartments = () => {
    connection.query('SELECT * FROM departments', function(err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
};

// View all roles (job title, role id, the department that role belongs to, and the salary for that role)
viewRoles = () => {
    connection.query('SELECT roles.id, title, salary, department FROM roles LEFT JOIN departments ON roles.department_id = departments.id', function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
};

// View all employees (employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to)
viewEmployees = () => {
    connection.query('SELECT employees.id, employees.first_name, employees.last_name, title, salary, CONCAT(m.first_name, " ", m.last_name) AS manager  FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees m ON m.id = employees.manager_id', function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    })
}

// Add a department (prompted to enter the name of the department)
addDepartment =() => {
    connection.query('INSERT INTO departments (department) VALUES ("Test")', function (err, res) {
        if (err) throw err;
        viewDepartments();
        connection.end();
    })
}

// Add a role (prompted to enter the name, salary, and department for the role and that role is added to the database)
addRole = () => {
    connection.query('INSERT INTO roles (title, salary, department_id) VALUES ("Test", 111, 2)', function (err, res) {
        if (err) throw err;
        viewRoles();
        connection.end;
    });
};

// Add an employee (prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database)
addEmployee = () => {
    connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("First", "Last", 2, 3)', function (err, res) {
        if (err) throw err;
        viewEmployees();
        connection.end();
    });
};

// Update an employee role
updateEmployee = () => {
    connection.query('UPDATE employees SET role_id = 4 WHERE employees.id = 1', function (err,res) {
        if (err) throw err;
        viewEmployees();
        connection.end();
    });
};

function menu() { 
    inquirer.prompt ([
        {
            name: "input",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]

        }
    ])
    .then((answer) => {
        if (answer.input === "View All Departments") {
            viewDepartments();
        } else if (answer.input === "View All Roles") {
            viewRoles();
        } else if (answer.input === "View All Employees") {
            viewEmployees();
        }
    });
;}



const startApp = () => {
    console.log(logo);
    menu();
};

startApp();