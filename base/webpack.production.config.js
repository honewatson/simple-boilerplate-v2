const DashboardPlugin = require('webpack-dashboard/plugin');
const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');
const WebpackShellPlugin = require('webpack-shell-plugin');


module.exports = {
    entry: [

        './index.js',
        // the entry point of our app

        './stylesheets/scss.js',

    ].concat(utils.getAllFilesFromFolder(__dirname + "/html")),
    output: {
        filename: 'js/webpack.bundle.js',
        // the output bundle

        path: resolve(__dirname, 'static'),

        publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, 'src'),

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: utils.styleLoaders,
                })
            },
            {
                test: /\.html$/,
                use: [
                    "file-loader?name=[name].[ext]",
                    "extract-loader",
                    "template-html-loader?engine=nunjucks"
                ]
            }

        ],
    },

    plugins: [
        new WebpackShellPlugin(
            {
                onBuildStart: [],
                onBuildEnd: []
            }
        ),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new ExtractTextPlugin({
            filename: 'css/main.css',
            disable: false,
            allChunks: true
        }),
        // Extract css to dist/main.css

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // define the environment
    ],
};