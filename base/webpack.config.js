
var path = require('path');
var webpack = require('webpack');
var WebpackShellPlugin = require('webpack-shell-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
//var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
var utils = require('./utils');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
]

var port = '3031';

module.exports = {
    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        // enable HMR on the server

        contentBase: path.resolve(__dirname, 'dist'),
        // match the output path

        publicPath: '/'
        // match the output `publicPath`
    },

    entry: [
        'webpack-dev-server/client?http://localhost:' + port,
        'webpack/hot/only-dev-server',
        './src/index.js',
        //'./src/stylesheets/scss.js'
    ],//.concat(utils.getAllFilesFromFolder(__dirname + "/html")),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.webpack.js',
        publicPath: '/dist/'
    },
    plugins: [
        new WebpackShellPlugin(
            {
                onBuildStart: [
                    'rm -rf js/global.js',
                    'node_modules/node-sass/bin/node-sass src/stylesheets/base.scss ./dist/main.css'
                ],
                onBuildEnd: []
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
        //new ExtractTextPlugin('main.css'),
        //ExtractTextPlugin.extract({ loader:[ 'css', 'less'], fallbackLoader: 'style-loader' })
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new DashboardPlugin(),
        //new FlowBabelWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, 'src')]
            },
            // {
            //     test: /\.scss$/,
            //     //loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            //     use: ExtractTextPlugin.extract({
            //       fallback: ['css-loader', 'postcss-loader', 'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')],
            //       use: "style-loader"
            //     })
            // },
            // {
            //     test: /\.html$/,
            //     loaders: [
            //         "file-loader?name=[name].[ext]",
            //         "extract-loader",
            //         "template-html-loader?engine=nunjucks"
            //     ]
            // }
        ]
    },
    resolve: {
        extensions: ['.js', '.scss'],
        modules: [
            path.join(__dirname, './src')
        ]

    },
}
;