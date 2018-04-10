const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer = require('./lib/inquirer');

const run = async () => {
    const linguagem = await inquirer.askLanguage();
    files.readFile('teste.txt', linguagem.language);

}
clear();
console.log(
    chalk.green(
        figlet.textSync('SweepD', { horizontalLayout: 'full' })
    )
);

/*if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a git repository!'));
    process.exit();
}*/

run();






