const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArr= []

function fullFunc(){
function promptManager(){
    return inquirer.prompt([
    {
    type: "input",
    message: "Enter your name",
    name: "name",
    },
    {
    type: "input",
    message: "Enter your id number",
    name: "id",
    },
    {
    type: "input",
    message: "Enter your email",
    name: "email",
    },
    {
    type: "input",
    message: "Enter your office number",
    name: "office",
    },

])
.then(response =>{
    const manager = new Manager(response.name, response.email, response.id, response.office)
    employeeArr.push(manager)
    nextQuestion();
})
} 
function promptEngineer(){
    return inquirer.prompt([
        {
        type: "input",
        message: "Enter your name",
        name: "name",
        },
        {
        type: "input",
        message: "Enter your id number",
        name: "id",
        },
        {
        type: "input",
        message: "Enter your email",
        name: "email",
        },
        {
        type: "input",
        message: "Enter your github",
        name: "github",
        },

    ])
    .then(response =>{
    const engineer = new Engineer(response.name, response.email, response.id, response.github)
    employeeArr.push(engineer)
    nextQuestion();
})
}


function promptIntern(){
    inquirer.prompt([
        {
        type: "input",
        message: "Enter your name",
        name: "name",
        },
        {
        type: "input",
        message: "Enter your id number",
        name: "id",
        },
        {
        type: "input",
        message: "Enter your email",
        name: "email",
        },
        {
        type: "input",
        message: "Enter the name of your school",
        name: "school",
        },

    ])
.then(response =>{
    const intern = new Intern(response.name, response.email, response.id, response.school)
    employeeArr.push(intern)
    nextQuestion();
})
}
function nextQuestion(){
    inquirer.prompt([
        {
        type: "list",
        message: "Select type of employee to add",
        name: "newEmployee",
        choices: ["Engineer", "Manager", "Intern", "I am finished entering"]
        }
    ])
    .then(response => {
        console.log(response)
        switch(response.newEmployee) {
            case "Engineer": promptEngineer();
        break;
            case "Manager": promptManager();
        break;
            case "Intern": promptIntern();
        break;
            default: createTeam();
        }
      })
    }
    function createTeam(){
        const html = render(employeeArr)
        fs.writeFile("team.html", html, function(error){
        if (error) console.log(error)
    })
    } nextQuestion();
}
fullFunc();