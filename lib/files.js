const fs = require('fs');
const path = require('path');
const jsFind = require('./find-js-deprecated');
const phpFind = require('./find-php-deprecated');


module.exports = {

    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    readFile: (nomeArquivo, linguagem) => {
        try {
            fs.readFile(nomeArquivo, (err, data) => {
                if (err) throw err;
                var texto = (''+data);

                if (linguagem === 'js') 
                    jsFind.buscaDepreciadas(texto);

                if (linguagem === 'php')
                    phpFind.buscaDepreciadas(texto);
                
            });
        } catch (err) {
            console.log(err);
        }
    }
};
