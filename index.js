#!/usr/bin/env node --harmony
const program = require('commander');
const files = require('./lib/files');
const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const deprecated = require('./lib/list-deprecated');

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
      fs.readFile(arquivos[i], 'utf8', (err, data) => {
        if (err) throw err;
        var deprecateds;
        if (ext === 'php') {
          deprecateds = deprecated.getPhp();
        } else {
          deprecateds = [];
        }
        var array = data.toString().split("\n");
        for (n in array) {
          for (var j = 0; j < deprecateds.length; j++) {
            if (array.includes(deprecateds[j].funcao)) {
              msg(deprecateds[j], n, arquivos[i-1]);
              console.log('\n');
            }
          }
        }
     
      });
    } catch (err) {
      console.log(err);
    }
  }
}

function msg(texto, i, arquivo) {
  console.log(
    chalk.red(
      'arquivo: '+arquivo+'\nlinha '+i
    )
  );
  console.log(
    chalk.red(
      texto.funcao + ' é uma função depreciada e insegura, remova!'
    )
  );

  if (texto.motivo !== undefined) {
    console.log(
      chalk.yellow(
        'Motivo: ' + texto.motivo
      )
    );
  }
  if (texto.solucao !== undefined) {
    console.log(
      chalk.green(
        'Solução: ' + texto.motivo
      )
    );

  }
}

