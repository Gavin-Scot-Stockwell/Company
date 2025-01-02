import inquirer from "inquirer";
import express from "express";
import pool from "./connections";

const app = express();
const PORT = process.env.PORT || 3001;

// Middle Ware!
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Database connection

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
                    'Add an employee',
                    'Update an employee role',
                    'Exit',
                ],
            },
        ])
        .then((answers: { openScreen: string }) => {
            switch (answers.openScreen) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    console.log('View all roles is under construction');
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    console.log('View all employees is under construction');
                    break;
                case 'Add a department':
                    addDepartment();
                    console.log('Add a department is under construction');
                    break;
                case 'Add a role':
                    addRole();
                    console.log('Add a role is under construction');
                    break;
                case 'Add an employee':
                    addEmployee();
                    console.log('Add an employee is under construction');
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    console.log('Update an employee role is under construction');
                    break;
                case 'Exit':
                    exit();
                    break;
                default:
                    console.log(`You selected: ${answers.openScreen}`);
                    break;
            }
                
        });
}

function viewAllDepartments() {
    pool.query('SELECT id, name FROM department', (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.table(res.rows); // Display the entire rows as a table
            setTimeout(() => {
                mainMenu(); // Return to the main menu after displaying the table
            }, 500); // Small delay to ensure the table is fully rendered
        }
    });
}

function viewAllRoles() {
    pool.query('SELECT * FROM role', (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.table(res.rows); // Display the entire rows as a table
            setTimeout(() => {
                mainMenu(); // Return to the main menu after displaying the table
            }, 500); // Small delay to ensure the table is fully rendered
        }
    });
}

function viewAllEmployees() {
    pool.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.table(res.rows); // Display the entire rows as a table
            setTimeout(() => {
                mainMenu(); // Return to the main menu after displaying the table
            }, 500); // Small delay to ensure the table is fully rendered
        }
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?',
            },
        ])
        .then((answers: { departmentName: string }) => {
            pool.query('INSERT INTO department (name) VALUES ($1)', [answers.departmentName], (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack);
                } else {
                    console.log(`Department ${answers.departmentName} added successfully!`);
                    setTimeout(() => {
                        mainMenu(); // Return to the main menu after displaying the table
                    }, 500); // Small delay to ensure the table is fully rendered
                }
            });
        });

}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'What is the title of the role?',
            },
            {
                type: 'number',
                name: 'roleSalary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'number',
                name: 'departmentId',
                message: 'What is the department ID of the role?',
            },
        ])
        .then((answers: { roleTitle: string, roleSalary: number, departmentId: number }) => {
            pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.roleTitle, answers.roleSalary, answers.departmentId], (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack);
                } else {
                    console.log(`Role ${answers.roleTitle} added successfully!`);
                    setTimeout(() => {
                        mainMenu(); // Return to the main menu after displaying the table
                    }, 500); // Small delay to ensure the table is fully rendered
                }
            });
        });

}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: 'What is the first name of the employee?',
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: 'What is the last name of the employee?',
            },
            {
                type: 'number',
                name: 'roleId',
                message: 'What is the role ID of the employee?',
            },
            {
                type: 'number',
                name: 'managerId',
                message: 'What is the manager ID of the employee?',
            },
        ])
        .then((answers: { employeeFirstName: string, employeeLastName: string, roleId: number, managerId: number }) => {
            pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.employeeFirstName, answers.employeeLastName, answers.roleId, answers.managerId], (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack);
                } else {
                    console.log(`Employee ${answers.employeeFirstName} ${answers.employeeLastName} added successfully!`);
                    setTimeout(() => {
                        mainMenu(); // Return to the main menu after displaying the table
                    }, 500); // Small delay to ensure the table is fully rendered
                }
            });
        });
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'number',
                name: 'employeeId',
                message: 'What is the ID of the employee?',
            },
            {
                type: 'number',
                name: 'roleId',
                message: 'What is the new role ID of the employee?',
            },
        ])
        .then((answers: { employeeId: number, roleId: number }) => {
            pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.roleId, answers.employeeId], (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack);
                } else {
                    console.log(`Employee ${answers.employeeId} updated successfully!`);
                    setTimeout(() => {
                        mainMenu(); // Return to the main menu after displaying the table
                    }, 500); // Small delay to ensure the table is fully rendered
                }
            });
        });
}

function exit () {
    console.log('Goodbye! Logging out...');
    process.exit();
}

// Start the application by displaying the main menu
mainMenu();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});