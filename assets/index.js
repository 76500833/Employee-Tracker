const inquirer = require('inquirer');
const mysql = require('mysql2');
//TODO WHEN I choose to view all departments
//TODO THEN I am presented with a formatted table showing department names and department ids
//? If they select to view all departments, write to file query.sql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9203',
    database: 'employees_db'
});
const questions = [
    {
        type: 'list',
        name: 'select',
        message: 'What would you like to do? ',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee(s) role'],
    }
];


const promptUser = () => {
    inquirer.prompt(questions)
        .then((answers) => {
            if (answers.select === 'view all departments') {
                connection.query('SELECT * FROM department', function (err, results) {
                    if (err) throw err;
                    results.forEach(department => {
                        console.log(`ID: ${department.id}, Name: ${department.name}`);
                    });
                });
            }
            if (answers.select === 'view all roles') {
                connection.query('SELECT * FROM role', function (err, results) {
                    if (err) throw err;
                    results.forEach(role => {
                        console.log(`ID: ${role.id}, Title: ${role.title}, Salary: ${role.salary}, Department ID: ${role.department_id}`);
                        
                    });
                });
            }
            if (answers.select === 'view all employees') {
                connection.query('SELECT * FROM employee', function (err, results) {
                    if (err) throw err;
                    results.forEach(employee => {
                        console.log(`ID: ${employee.id}, First Name: ${employee.first_name}, Last Name: ${employee.last_name}, Role ID: ${employee.role_id}, Manager ID: ${employee.manager_id}`);
                    });
                });
            }
            if (answers.select === 'add a department') {
                inquirer.prompt({
                    type: 'input',
                    name: 'departmentName',
                    message: 'What is the name of the department you wish to add?',
                })
                    .then((answers) => {


                        connection.query('INSERT INTO department SET ?', {
                            name: answers.departmentName
                        }, function (err, res) {
                            if (err) throw err;
                            console.log(`Succesfully added ${answers.departmentName} department!`);
                        });
                    })
            }
            //! Add a role
            if (answers.select === 'add a role') {
                inquirer.prompt([{
                    type: 'input',
                    name: 'roleName',
                    message: 'What is the name of the role you wish to add?',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for this role?',
                },
                {
                    type: 'input',
                    name: 'departmentId',
                    message: 'What is the department ID for this role?',
                }]
                )
                    .then((answers) => {


                        connection.query('INSERT INTO role SET ?', {
                            title: answers.roleName,
                            salary: answers.salary,
                            department_id: answers.departmentId
                        }, function (err, res) {
                            if (err) throw err;
                            console.log(`Succesfully added ${answers.roleName} role!`);
                        });
                    })
            }
            if (answers.select === 'add an employee') {
                inquirer.prompt([{
                    type: 'input',
                    name: 'employeeName',
                    message: 'What is the first name of the employee you wish to add?',
                },
                {
                    type: 'input',
                    name: 'employeeLastName',
                    message: 'What is the last name of the employee you wish to add?',
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the role ID of the employee?',
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'What is the employees manager ID?',
                }

                ])
                    .then((answers) => {


                        connection.query('INSERT INTO employee SET ?', {
                            first_name: answers.employeeName,
                            last_name: answers.employeeLastName,
                            role_id: answers.role_id,
                            manager_id: answers.manager_id,
                        }, function (err, res) {
                            if (err) throw err;
                            console.log(`Succesfully added ${answers.employeeName} ${answers.employeeLastName} to the team!`);
                        });
                    })
            }
            if (answers.select === 'update an employee(s) role') {
                inquirer.prompt([{
                    type: 'input',
                    name: 'employeeToUpdate',
                    message: 'What is the ID of the employee you wish to give a new role to?',
                },
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'What is their new role?',
                }]
                )
                    .then((answers) => {

                        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.newRole, answers.employeeToUpdate], function (err, res) {
                            
                        
                            if (err) throw err;
                            console.log(`Succesfully changed employee #${answers.employeeToUpdate}'s role!`);
                        });
                    })
            }
            // Handle other choices here...
        })
}

function init() {
    promptUser(questions)
}

// Function call to initialize app
init();
