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
            
            } if (answers.select === 'view all roles') {
                connection.query('SELECT * FROM role', function (err, results) {
                    if (err) throw err;
                    //mysql2 returns results as an array of objects, where each object represents a row from the role table.
                    //So we are giving a foreach access to this array of objects, calling it row, and saying for each row, print this out:
                    results.forEach(role => {
                        console.log(`ID: ${role.id}, Title: ${role.title}, Salary: ${role.salary}, Department ID: ${role.department_id}`);
                })
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