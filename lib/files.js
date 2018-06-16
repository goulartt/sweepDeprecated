const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


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
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            var ext = filename.split('.');
            ext = ext[ext.length-1];
            console.log(ext);
            if (stat.isDirectory()) {
                results = results.concat(findFiles('./'+filename,filter)); //nao funciona recursividade na porra de modulo
            }
            else if (ext === filter) {
                console.log('-- found: ', filename);
                results.push(filename);
            }
        }
        return results;
    }
};

function findFiles(startPath, filter) {
    var results = [];

    if (!fs.existsSync(startPath)) {
        return;
    }
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            results = results.concat(findFilesInDir(filter, filename)); //recurse
        }
 
        else if (filename.indexOf(filter) >= 0) {
            console.log('-- found: ', filename);
            results.push(filename);
        }
    }
    return results;
}