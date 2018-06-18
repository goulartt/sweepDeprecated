#!/usr/bin/env node --harmony

const program = require('commander');
const files = require('./lib/files');
const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const deprecated = require('./lib/list-deprecated');
const _cliProgress = require('cli-progress');

program
  .version('1.0.6')
  .description('Varrer funções inseguras e depreciadas');

program
  .command('php')
  .alias('ph')
  .description('Rodar script php')
  .action(() => {
    init('php');
  });

program
  .command('javascript')
  .alias('js')
  .description('Rodar script js')
  .action(() => {
    init('js');
  });

program
  .command('python')
  .alias('py')
  .description('Rodar script Python 2')
  .action(() => {
    init('py');
  });

program.parse(process.argv);



function init(ext) {
  clear();
  console.log(
    chalk.green(
      figlet.textSync('SweepD', {
        horizontalLayout: 'full'
      })
    )
  );

  var arquivos = files.findFilesInDir(files.getCurrentDirectoryBase(), ext);

  const bar1 = criaBar(arquivos.length);
  for (var i = 0; i < arquivos.length; i++) {
    try {
      fs.readFile(arquivos[i], 'utf8', (err, data) => {
        if (err) throw err;
        var deprecateds;
        if (ext === 'php') {
          deprecateds = deprecated.getPhp();
        } else if (ext === 'py') {
          deprecateds = deprecated.getPy2();
        } else {
          deprecateds = [];
        }
        var array = data.toString().split("\n");
        bar1.update(i);
        for (n in array) {
          for (var j = 0; j < deprecateds.length; j++) {
            if (array[n].includes(deprecateds[j].funcao)) {
              msg(deprecateds[j], n, arquivos[i - 1]);
              console.log('\n');
              achou=true;
            }
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  bar1.update(arquivos.length);
  bar1.stop();
}

function msg(texto, i, arquivo) {
  console.log(
    chalk.red(
      'arquivo: ' + arquivo + '\nlinha ' + i
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
        'Solução: ' + texto.solucao
      )
    );

  }
}

function criaBar(tamanho) {
  const bar1 = new _cliProgress.Bar({
    barCompleteChar: '#',
    barIncompleteChar: '.',
    fps: 5,
    stream: process.stdout,
    barsize: 50,
  }, _cliProgress.Presets.shades_grey);
  console.log(
    chalk.green(
      'Analisando arquivos encontrados...'
    )
  );
  bar1.start(tamanho, 0);
  return bar1;
}