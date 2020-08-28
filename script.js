


const inquirer = require("inquirer");
const connection = require("./db/connection");
const cTable = require("console.table");
const initQ = {
  type: "rawlist",
  name: "task",
  message: "What would you like to do?",
  choices: ["View", "Add", "Edit"],
};
const endQ = {
  type: "list",
  name: "continue",
  message: "Would you like to do something else?",
  choices: ["Yes", "No"],
};
async function start() {
  const answer = await inquirer.prompt(initQ);
  if (answer.task === "View") {
    view();
  } else if (answer.task === "Add") {
    add();
  } else if (answer.task === "Edit") {
    edit();
  } else {
    console.log("You broke it :(");
  }
}
start();
function view() {
  inquirer
    .prompt({
      type: "list",
      name: "view",
      message: "What would you like to view?",
      choices: [`Departments`, `Roles`, `Employees`],
    })
    .then((answer) => {
      let queryString = "";
      switch (answer.view) {
        case "Departments":
          queryString = "select * from departments";
          break;
        case "Roles":
          queryString =
            "select roles.id, roles.title, roles.salary, departments.name as department from roles left join departments on departments.id = roles.department_id;";
          break;
        case "Employees":
          queryString =
            "select employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name as department, concat(manager.first_name, ' ', manager.last_name) as manager from employees left join roles on employees.role_id = roles.id left join departments on departments.id = roles.department_id left join employees manager on employees.manager_id = manager.id;";
      }
      connection.query(queryString, function (err, res) {
        if (err) throw err;
        console.table(res);
        end();
      });
    });
}
function add() {
  inquirer
    .prompt({
      type: "list",
      name: "addWhat",
      message: "What would you like to add?",
      choices: ["Department", "Role", "Employee"],
    })
    .then((answer) => {
      switch (answer.addWhat) {
        case "Department":
          addDepartment();
          break;
        case "Role":
          addRole();
          break;
        case "Employee":
          addEmployee();
          break;
      }
    });
}
function edit() {
  inquirer
    .prompt({
      type: "list",
      name: "editWhat",
      message: "what would you like to edit?",
      choices: ["Department", "Employee Role"],
    })
    .then((answer) => {
      switch (answer.editWhat) {
        case "Department":
          editDepartment();
          break;
        case "Employee Role":
          editRole();
          break;
      }
    });
}
async function addDepartment() {
  const departmentsArr = await connection.query("select * from departments");
  const answer = await inquirer.prompt({
    type: "input",
    name: "newDep",
    message: "Please enter a name for the new department",
  });
  const deptId = await connection.query(
    "select id from departments where name = '" + answer.newDep + "';"
  );
  connection.query(
    "insert into departments (name) values (?)",
    [answer.newDep],
    function (err) {
      if (err) throw err;
      console.log("Department added successfully");
      end();
    }
  );
}
async function addRole() {
  const departmentsArr = await connection.query("select * from departments");
  console.log(departmentsArr);
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Please enter a title for the new role",
    },
    {
      type: "input",
      name: "salary",
      message: "Please enter a salary",
    },
    {
      type: "list",
      name: "dept",
      message: "Please select a department",
      choices: departmentsArr,
    },
  ]);
  const deptId = await connection.query(
    "select id from departments where name = '" + answers.dept + "';"
  );
  connection.query(
    "insert into roles (title, salary, department_id) values (?, ?, ?)",
    [answers.title, answers.salary, deptId[0].id],
    function (err) {
      if (err) console.log(err);
      console.log("Role added successfully");
      end();
    }
  );
}
async function addEmployee() {
  // select all from roles
  const rolesArr = await connection.query("select * from roles");
  // select all from employees so you have a list of managers to choose from
  const empArr = await connection.query("select * from employees");
  let titlesArr = [];
  let namesArr = [];
  for (let i = 0; i < rolesArr.length; i++) {
    titlesArr.push(rolesArr[i].title);
  }
  for (let i = 0; i < empArr.length; i++) {
    namesArr.push(empArr[i].first_name);
  }
  console.log(namesArr);
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "first",
      message: "Please enter new employee's first name",
    },
    {
      type: "input",
      name: "last",
      message: "Please enter last name",
    },
    {
      type: "list",
      name: "role",
      message: "Please select employee's position",
      choices: titlesArr,
    },
    {
      type: "list",
      name: "manager",
      message: "Please enter their manager's ID",
      choices: namesArr,
    },
  ]);
  const roleID = await connection.query(
    "select id from roles where title = '" + answers.role + "';"
  );
  const managerID = await connection.query(
    "select id from employees where first_name = '" + answers.manager + "';"
  );
  connection.query(
    "insert into employees (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)",
    [answers.first, answers.last, roleID[0].id, managerID[0].id],
    function (err) {
      if (err) throw err;
      console.log("The new employee has been added successfully");
      end();
    }
  );
}
async function editDepartment() {
  const deptArr = await connection.query("select * from departments");
  const answers = await inquirer.prompt([
    {
      type: "rawlist",
      name: "dept",
      message: "Which department would you like to edit?",
      choices: deptArr,
    },
    {
      type: "input",
      name: "newValue",
      message: "What would you like to change the department name to?",
    },
  ]);
  const deptId = await connection.query(
    "select id from departments where name = '" + answers.dept + "';"
  );
  connection.query(
    "update departments set name = ? where id = ?",
    [answers.newValue, deptId[0].id],
    (err) => {
      if (err) throw err;
      console.log("Department edited successfully");
    }
  );
}
async function editRole() {
  const empArr = await connection.query("select * from employees");
  const rolesArr = await connection.query("select * from roles");
  let titlesArr = [];
  let namesArr = [];
  for (let i = 0; i < rolesArr.length; i++) {
    titlesArr.push(rolesArr[i].title);
  }
  for (let i = 0; i < empArr.length; i++) {
    namesArr.push(empArr[i].first_name);
  }
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "empName",
      message: "Which employee's role would you like to change?",
      choices: namesArr,
    },
    {
      type: "list",
      name: "newRole",
      message: "Please select the employees new role",
      choices: titlesArr,
    },
  ]);
  const roleId = await connection.query(
    "select id from roles where title = '" + answers.newRole + "';"
  );
  const empId = await connection.query(
    "select id from employees where first_name = '" + answers.empName + "';"
  );
  console.log(empId)
  connection.query(
    "update employees set role_id = ? where id = ?",
    [roleId[0].id, empId[0].id],
    function (err) {
      if (err) console.log(err);
      console.log("Role updated successfully");
      end();
    }
  );
}
function end() {
  inquirer.prompt(endQ).then((answer) => {
    if (answer.continue === "Yes") {
      start();
    } else if (answer.continue === "No") {
      console.log("Bye");
      connection.end();
    }
  });
}