const inquirer = require('inquirer');
//const connect = require('./utils/connection');
require('console.table');
const mysql = require("mysql2");

//const connection = require('./utils/connection')

const sqlConnect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
});

//database connection
sqlConnect.connect((err) => {
    if (err) throw err;
    console.log('Database Connected');
});

//use inquirer 
promptUser();

function promptUser() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'home',
                message: "Welcome to the main menu. Please select an option.",
                choices: [
                    { name: "View all employees" },
                    { name: 'View all departments' },
                    { name: 'View all roles' },
                    { name: 'Add employee' },
                    { name: 'Add department' },
                    { name: 'Add role' },
                    { name: 'Exit App' },
                ]
            }
        ])
        .then((res) => {
            let response = res.home;
            switch (response) {
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'Add employee':
                    addEmployee();
                    break;
                case 'Add department':
                    addDepartment();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'Exit App':
                    console.log('Bye!');
                    process.exit();
            }
        });
}

//view all employees
function viewAllEmployees() {
    const query = `SELECT * FROM employee;`
    sqlConnect.query(query, (err, res) => {
        console.table(res);
        promptUser();
    });
}

//view all departments
function viewAllDepartments() {
    const query = `SELECT * FROM department;`
    sqlConnect.query(query, (err, res) => {
        console.table(res);
        promptUser();
    });
}

//view all roles
function viewAllRoles() {
    const query = `SELECT * FROM role;`
    sqlConnect.query(query, (err, res) => {
        console.table(res);
        promptUser();
    });
}

//add employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'employee first name:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'employee last name:'
            },
            {
                type: "input",
                name: "role_id",
                message: "role id:",
            },
            {
                type: "input",
                name: "manager_id",
                message: "manager's id:",
            },
        ])
        .then((res) => {
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const employeeInfo = [
                res.first_name,
                res.last_name,
                res.role_id,
                res.manager_id
            ];
            sqlConnect.query(query, employeeInfo, (err, res) => {
                if (err) throw err;
                console.table(res);
                promptUser();
            });
        });
}
//add department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'department name:'
        },
    ])
    .then(function (res) {
        const query = `INSERT INTO department (name) VALUES (?)`
        sqlConnect.query(query, res.department_name, (err, res) => {
            console.table(res);
            promptUser();
        });
    });
}

//add role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role_name',
            message: 'Role name:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Role salary:'
        },
        {
            type: 'input',
            name: 'role_dept',
            message: 'Department for this role:'
        },
    ])
    .then(function (res) {
        const query = `INSERT INTO role (title, salary, departments_id) VALUES (?,?,?)`
        const roleInfo = [
            res.role_name,
            res.salary,
            res.role_dept
        ];
        sqlConnect.query(query, roleInfo, (err, res) => {
            console.table(res);
            promptUser();
        })
    })
}