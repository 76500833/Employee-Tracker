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
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add and employee', 'update an employee(s) role'],
    }
];


const promptUser = () => {
    inquirer.prompt(questions)
        .then((answers) => {
            if (answers.select === 'view all departments') {
                connection.query('SELECT * FROM department', function(err, results) {
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
            // Handle other choices here...
        });
}

function init() {
    promptUser(questions)
}

// Function call to initialize app
init();
