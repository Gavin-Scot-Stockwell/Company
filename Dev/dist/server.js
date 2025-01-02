import inquirer from "inquirer";
import express from "express";
import { Pool } from "pg"; // Importing the pg module
const app = express();
const PORT = 3001;
// Middle Ware!
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Database connection
const pool = new Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'company_db',
    password: 'your_password',
    port: 3001,
});
function mainMenu() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'openScreen',
            message: 'Please select an option!',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Pay Employee',
                'Add an employee',
                'Update an employee role',
                'Exit',
            ],
        },
    ])
        .then((answers) => {
        if (answers.openScreen === 'View all departments') {
            viewAllDepartments();
        }
        else {
            console.log(`You selected: ${answers.openScreen}`);
            // Handle other options here
        }
    });
}
function viewAllDepartments() {
    pool.query('SELECT name FROM department', (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        }
        else {
            const departmentNames = res.rows.map(row => row.name);
            inquirer
                .prompt([
                {
                    type: 'list',
                    name: 'departmentOptions',
                    message: 'Please select a department option!',
                    choices: [...departmentNames, 'Back to main menu'],
                },
            ])
                .then((answers) => {
                if (answers.departmentOptions === 'Back to main menu') {
                    mainMenu();
                }
                else {
                    console.log(`You selected: ${answers.departmentOptions}`);
                    // Handle department-specific options here
                }
            });
        }
    });
}
// Start the application by displaying the main menu
mainMenu();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
