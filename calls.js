const program = require('commander');
// Require logic.js file and extract controller functions using JS destructuring assignment
const files = require('./lib/files');
const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');

program
  .version('0.0.1')
  .description('Varrer funções inseguras e depreciadas');

program
  .command('php')
  .alias('p')
  .description('Rodar script php')
  .action(() => {
    init('php');
  });

program
  .command('js')
  .alias('j')
  .description('Rodar script js')
  .action(() => {
    init('js');
  });

program.parse(process.argv);



function init(ext) {
  clear();
  console.log(
    chalk.green(
      figlet.textSync('SweepD', { horizontalLayout: 'full' })
    )
  );
  var arquivos = files.findFilesInDir(files.getCurrentDirectoryBase(), ext);
  for (var i = 0; i < arquivos.length; i++) {

    try {
      console.log(arquivos[i]);
      fs.readFile(arquivos[i], 'utf8', (err, data) => {
        if (err) throw err;
        if (data.includes('joao')) {
          msg('joao');
        }

      });
    } catch (err) {
      console.log(err);
    }
  }
}

function msg(texto) {
  console.log(
    chalk.red(
      texto + ' é uma função depreciada e insegura, remova!'
    )
  );
}

