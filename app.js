const inquirer = require('inquirer');

const logo = `
#######                                                    #######                                           
#       #    # #####  #       ####  #   # ###### ######       #    #####    ##    ####  #    # ###### #####  
#       ##  ## #    # #      #    #  # #  #      #            #    #    #  #  #  #    # #   #  #      #    # 
#####   # ## # #    # #      #    #   #   #####  #####        #    #    # #    # #      ####   #####  #    # 
#       #    # #####  #      #    #   #   #      #            #    #####  ###### #      #  #   #      #####  
#       #    # #      #      #    #   #   #      #            #    #   #  #    # #    # #   #  #      #   #  
####### #    # #      ######  ####    #   ###### ######       #    #    # #    #  ####  #    # ###### #    #    
`;

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
        if (answer === "View All Departments") {
            viewDepartments();
        } 
        menu();
    });
;}



const startApp = () => {
    console.log(logo);
    menu();


    
};

startApp();