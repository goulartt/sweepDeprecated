

module.exports = {
    getIgnoreList: () => {
        return [
            'node_modules',
            '.git',
            'target',
            'bower_components',
            'lib',
            'AppData',
            'Arquivos e Programas',
            'Program Files',
            'Windows',
            'Temp',
            'ProgramData',
            '$Recycle.Bin',
            'ccmcache',
            '$RECYCLE.BIN',
        ];
    }
};