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
    inquirer.prompt([
        {
            name: 'department_name',
            type: 'input',
            message: "What is the new department's name?",
            validate: (department_name) => {
                if (department_name) {
                    return true;
                } else {
                    console.log (`please enter department name`);
                    return false;
                }
            }
        }
        ]).then((answer) => {
        connection.query(`INSERT INTO departments (department) VALUES ("${answer.department_name}")`, function (err, res) {
            if (err) throw err;
            menu();
        });
    });
};

// Add a role (prompted to enter the name, salary, and department for the role and that role is added to the database)
addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: "What is the new role's title?",
            validate: (title) => {
                if (title) {
                    return true;
                } else {
                    console.log (`please enter role title`);
                    return false;
                }
            }
        },
        {
            name: 'salary',
            type: 'number',
            message: "What is the new role's salary (numbers only)?",
            validate: (salary) => {
                if (salary) {
                    return true;
                } else {
                    console.log (`please enter salary`);
                    return false;
                }
            }
        },
        {
            name: 'department',
            type: 'number',
            message: "What is the new role's department id? (see View All Departments)",
            validate: (department) => {
                if (department) {
                    return true;
                } else {
                    console.log (`please enter salary`);
                    return false;
                }
            }
        }

        ]).then((answer) => {
        connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}", ${answer.salary}, ${answer.department})`, function (err, res) {
            if (err) throw err;
            menu();

        });
    
    });
};

// Add an employee (prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database)
addEmployee = () => {
    inquirer.prompt ([
        {
            name: 'first_name',
            type: 'input',
            message: "What is the new employee's first name?",
            validate: (first_name) => {
                if (first_name) {
                    return true;
                } else {
                    console.log (`please enter first name`);
                    return false;
                }
            }
        },
        {
            name: 'last_name',
            type: 'input',
            message: "What is the new employee's last name?",
            validate: (last_name) => {
                if (last_name) {
                    return true;
                } else {
                    console.log (`please enter last name`);
                    return false;
                }
            }
        },
        {
            name: 'role',
            type: 'number',
            message: "What is the new employee's role id? (see View All Roles)",
            validate: (role) => {
                if (role) {
                    return true;
                } else {
                    console.log (`please enter role id`);
                    return false;
                }
            }
        },
        {
            name: 'manager',
            type: 'input',
            message: "What is the new employee's manager's id? (see View All Employees, if no manager type 'null')",
            validate: (manager) => {
                if (manager) {
                    return true;
                } else {
                    console.log (`please enter manager's id or type 'null'`);
                    return false;
                }
            }
        }
        ]).then((answer) => {
            connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", ${answer.role}, ${answer.manager})`, function (err, res) {
                    if (err) throw err;
                    menu();
            });
        })
};

// Update an employee role
updateEmployee = () => {
    inquirer.prompt ([
        {
            name: 'updated_employee',
            type: 'number',
            message: "enter the employee's id (see View All Employees)",
            validate: (updated_employee) => {
                if (updated_employee) {
                    return true;
                } else {
                    console.log (`please enter employee id`);
                    return false;
                }
            }
        },
        {
            name: 'updated_role',
            type: 'number',
            message: "enter the new role's id (see View All Roles)",
            validate: (updated_role) => {
                if (updated_role) {
                    return true;
                } else {
                    console.log (`please enter new role id`);
                    return false;
                }
            }
        }
        ]).then((answer) => {
            connection.query(`UPDATE employees SET role_id = ${answer.updated_role} WHERE employees.id = ${answer.updated_employee}`, function (err,res) {
            if (err) throw err;
            menu();
            }); 
            
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
        console.log("Selected " + answer.input);
        if (answer.input === "View All Departments") {
            viewDepartments();
        } else if (answer.input === "View All Roles") {
            viewRoles();
        } else if (answer.input === "View All Employees") {
            viewEmployees();
        } else if (answer.input === "Add a Department") {
            addDepartment();
        } else if (answer.input === "Add a Role") {
            addRole();
        } else if (answer.input === "Add an Employee") {
            addEmployee();
        } else if (answer.input === "Update an Employee Role") {
            updateEmployee();
        }
    });
;}



const startApp = () => {
    console.log(logo);
    menu();
};

startApp();