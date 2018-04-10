const inquirer = require('inquirer');
const files = require('./files');

module.exports = {

    askLanguage: () => {
        const questions = [
            {
                name: 'language',
                type: 'input',
                message: 'Digite php ou js de acordo com a linguagem do seu projeto:',
                validate: function (value) {
                    if (value.length) {
                        if (value === 'php' || value === 'js')
                            return true;
                        else 
                            return 'Por favor, digite php ou js';
                    } else {
                        return 'Por favor, digite a linguagem!';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
}
