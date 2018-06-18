const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ignore = require('./ignore');
const deprecated = require('./list-deprecated');
const _cliProgress = require('cli-progress');

let bar1 = new _cliProgress.Bar({
    barCompleteChar: '#',
    barIncompleteChar: '.',
    fps: 5,
    stream: process.stdout,
    barsize: 50,
}, _cliProgress.Presets.shades_grey);


module.exports = {

    getCurrentDirectoryBase: () => {
        return (path.dirname(process.cwd()) + '\\' + path.basename(process.cwd()));
    },

    directoryExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },


    findFilesInDir: (startPath, filter) => {
        var results = [];
        if (!fs.existsSync(startPath)) {
            console.log(
                chalk.green(
                    'É necessario rodar o script onde tenha a pasta src'
                )
            );
            return;
        }

        var files = fs.readdirSync(startPath);
        console.log(
            chalk.green(
                'Procurando arquivos com a extensão ' + filter + ' ...'
            )
        );
        bar1.start(files.length, 0);
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            var ext = filename.split('.');
            ext = ext[ext.length - 1];
            if (stat.isDirectory()) {
                var directory = filename.split('\\');
                directory = directory[directory.length - 1];
                if (ignore.getIgnoreList().indexOf(directory) === -1 && directory[0] !== '.') {
                    var recursive_results = findFiles(filename, filter, files.length);
                    if (recursive_results !== undefined && recursive_results.length > 0) {
                        for (j = 0; j < recursive_results.length; j++) {
                            results.push(recursive_results[j]);
                        }
                    }

                }

            } else if (ext === filter) {
                //console.log('-- encontrado: ', filename);
                results.push(filename);
            }
            bar1.update(i);
        }
        bar1.update(files.length);
        bar1.stop();
        return results;
    }
};

function findFiles(startPath, filter) {
    var results = [];
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        var ext = filename.split('.');
        ext = ext[ext.length - 1];
        if (stat.isDirectory()) {
            var directory = filename.split('\\');
            directory = directory[directory.length - 1];
            if (ignore.getIgnoreList().indexOf(directory) === -1) {
                var recursive_results = findFiles(filename, filter);
                if (recursive_results !== undefined && recursive_results.length > 0) {
                    for (j = 0; j < recursive_results.length; j++) {
                        results.push(recursive_results[j]);
                    }
                }
            }
        } else if (ext === filter) {
            //console.log('-- encontrado: ', filename);
            results.push(filename);
        }
    }
    return results;
}