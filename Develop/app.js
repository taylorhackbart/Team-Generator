const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
//CREATED AN ARRAY TO PUSH EMPLOYEE INFO INTO
const employeeArr = [];
const validateId = [];
function fullFunc() {
  //PROMPT MANAGER QUESTIONS
  function promptManager() {
    return (
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter your name",
            name: "name",
          },
          {
            type: "input",
            message: "Enter your id number",
            name: "id",
            validate: response => {
                if (validateId.includes(response) ){
                    console.log("ID has been taken")
                    return 
                } else {
                    return true
                }
            }
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
        //PUSH MANAGER QUESTIONS TO ARRAY
        .then((response) => {
          const manager = new Manager(
            response.name,
            response.email,
            response.id,
            response.office
          );
          employeeArr.push(manager);
          //PROMPT QUESTION TO ADD A NEW EMPLOYEE OR BE DONE
          nextQuestion();
        })
    );
  }
  //ENGINEER QUESTIONS
  function promptEngineer() {
    return (
      inquirer
        .prompt([
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
        //PUSH TO EMPLOYEE ARRAY AND PROMPT NEXT INPUT
        .then((response) => {
          const engineer = new Engineer(
            response.name,
            response.email,
            response.id,
            response.github
          );
          employeeArr.push(engineer);
          nextQuestion();
        })
    );
  }

  //INTERN QUESTIONS
  function promptIntern() {
    inquirer
      .prompt([
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
      //PUSH TO EMPLOYEE ARRAY AND PROMPT NEXT INPUT
      .then((response) => {
        const intern = new Intern(
          response.name,
          response.email,
          response.id,
          response.school
        );
        employeeArr.push(intern);
        nextQuestion();
      });
  }
  //NEXT QUESTION PROMPTS USER FOR EMPLOYEE TYPE OR TO FINISH ENTERING
  function nextQuestion() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select type of employee to add",
          name: "newEmployee",
          choices: ["Engineer", "Manager", "Intern", "I am finished entering"],
        },
      ])
      .then((response) => {
        console.log(response);
        switch (response.newEmployee) {
          case "Engineer":
            promptEngineer();
            break;
          case "Manager":
            promptManager();
            break;
          case "Intern":
            promptIntern();
            break;
          default:
            createTeam(); //ONCE FINISHED ENTERING EMPLOYEES, THIS FUNCTION GENERATES THE HTML ON LINE 160
        }
      });
  }
  //ONCE ALL HAVE BEEN ENTERED, GENERATE HTML FILE WITH INFO FROM EMPLOYEE ARRAY
  function createTeam() {
    const html = render(employeeArr);
    fs.writeFile("team.html", html, function (error) {
      if (error) console.log(error);
    });
    //THIS IS STARTING THE QUESTIONS PROMPTS WITH TYPE OF EMPLOYEE
  }
  nextQuestion();
}
fullFunc();
