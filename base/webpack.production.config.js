var path = require('path');
var webpack = require('webpack');
var WebpackShellPlugin = require('webpack-shell-plugin');

var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
var utils = require('./utils');

module.exports = {
    entry: [
        './src/index.js',
        './src/stylesheets/scss.js'
    ].concat(utils.getAllFilesFromFolder(__dirname + "/html")),
    output: {
        path: path.join(__dirname, 'js'),
        filename: 'global.js',
        publicPath: '/static/'
    },
    plugins: [
        new WebpackShellPlugin(
            {
                onBuildStart: [],
                onBuildEnd: []
            }
        ),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new FlowBabelWebpackPlugin(),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            },
            {
                test: /\.html$/,
                loaders: [
                    "file-loader?name=[name].[ext]",
                    "extract-loader",
                    "template-html-loader?engine=nunjucks"
                ]
            }]
    },
    resolve: {
        extensions: ['', '.js', '.scss'],
        root: [path.join(__dirname, './src')]
    }
};
