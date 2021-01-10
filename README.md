# employee-tracker

  ## Description

  A Node application to create, update, and maintain a database of employees and company information.
  
To view a walkthrough, [Click Here](https://drive.google.com/file/d/1HqUYrKUti985gaa3ebyB5qjaKTHMlnTZ/view)
  
  ## Table of Contents
  
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Testing](#testing)
  * [License](#license)
  * [Questions](#questions)
  
  ## Installation

  You will need Node.js to run this program.  After cloning the code to your local device, be sure to run "node npm install" to include essential npm packages.
  
  ## Usage 
  
You will first need to set up your tracker.db database.  This program comes with the schema.sql and seeds.sql file to do so.  Feel free to update the seeds file to fit your company needs.

Open the SQL CLI by running "mysql -u root -p" and entering your password
Then run these two commands to create and fill the database:
"source db/schema.sql"
then
"source db/seeds.sql"
You can also use these two commands to refresh your database if needed.

Once your database is created and seeds, exit the SQL CLI by typing "quit".

Run "node server" to start the program.  You can then select from the various option to view, add, or update your employees, roles, and departments.  Plrease control c to quit the program.
  
  ## Contributing

 Please reach out via email if you wish to contribute (see questions section below)
  
  ## Testing

  No testing currently.
  
  ## License

  [![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)
  
  ## Questions
  
  * GitHub: [@fancibleunicorn](https://github.com/fancibleunicorn)
  * Email: adamcrandall91@gmail.com
