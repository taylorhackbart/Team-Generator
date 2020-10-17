const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

employeeArr=[]

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
    message: "managers, enter your office number",
    name: "office",
    },

])
.then(answers =>{
    const manager = new Manager(answers.name, answers.email, answers.id, answers.office)
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
        message: "engineers, enter your github",
        name: "github",
        },

    ])
    .then(answers =>{
    const engineer = new Engineer(answers.name, answers.email, answers.id, answers.github)
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
        message: "Enter the name of your schools name",
        name: "school",
        },

    ])
.then(answers =>{
    const intern = new Intern(answers.name, answers.email, answers.id, answers.school)
    employeeArr.push(intern)
    nextQuestion();
})
}
function nextQuestion(){
    inquirer.prompt([
        {
        type: "checkbox",
        message: "Select type of employee to add",
        name: "type",
        choices: ["Engineer", "Manager", "Intern", "I am finished entering"]
        }
    ])
    .then(answers =>{
        if (answers === "Engineer"){
            promptEngineer();
        } else if (answers === "Manager"){
            promptManager();
        } else if (answers === "Intern"){
            promptIntern();
        } else if (answers === "I am finished entering"){
            const renderHtml = render(employeeArr);
            fs.writeFile(outputPath, renderHtml, function(error){
                if(error){
                    console.log(error);
                }
            })
        }
    })
}
nextQuestion();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an employee containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
