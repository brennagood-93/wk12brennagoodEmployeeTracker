const inquirer = require (inquirer);
const connection = require("./db/connection");

const initQ = [{
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: [
        "View", "Add", "Update"
    ]
},
{   type: "list",
    name: "view",
    message: "What would you like to view?",
    choices: ["Departments", "Roles", "Employees"]
},
{
    type: "list",
    name: "add",
    message: "What would you like to add?",
    choices: ["Departments", "Roles", "Employees"]
},
{
    type: "list",
    name: "update",
    message: "What would you like to update?",
    choices: ["Departments", "Roles", "Employees"]
},
];

function view(){

}

function add(){

}

function update(){

}