

module.exports = {
    getIgnoreList: () => {
        return [
            'node_modules',
            '.git',
            'target',
            'bower_components',
            'lib'
        ];
    }
};