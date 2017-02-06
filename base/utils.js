const {resolve} = require('path');

var getAllFilesFromFolder = function(dir) {
    var filesystem = require("fs");
    var results = [];
    filesystem.readdirSync(dir).forEach(function(file) {
        file = dir+'/'+file;
        var stat = filesystem.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFilesFromFolder(file))
        } else results.push(file);
    });
    return results.filter(function(item) {
        return !item.match(/partial/);
    });
};


const styleLoaders = [
    {
        loader: 'css-loader',
        options: {
            modules: true
        }
    },
    {
        loader: 'postcss-loader'
    },
    {
        loader: 'sass-loader',
        options: {
            includePaths: [resolve(__dirname, './src')]
        }
    }
]


module.exports = {
    getAllFilesFromFolder: getAllFilesFromFolder,
    styleLoaders: styleLoaders
}