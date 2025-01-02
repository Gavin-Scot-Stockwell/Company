import inquirer from "inquirer";
//This is a test run on if inquirer is working
//The inquirer is working!
inquirer 
    .prompt([
        {
        type: "input",
        name: "name",
        message: "What's your name?"
        }
    ])
    .then(answers => {
        console.log(`Hello ${answers.name}!`);
    });
