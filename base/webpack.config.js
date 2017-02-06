const DashboardPlugin = require('webpack-dashboard/plugin');
const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');


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
    entry: [

        'webpack-dev-server/client?http://localhost:3031',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        './index.js',
        // the entry point of our app

        './stylesheets/scss.js',

    ].concat(utils.getAllFilesFromFolder(__dirname + "/html")),
    output: {
        filename: 'dist/webpack.bundle.js',
        // the output bundle

        path: resolve(__dirname, 'dist'),

        publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, 'src'),

    devtool: 'inline-source-map',

    devServer: {
        //hot: true,
        // enable HMR on the server

        contentBase: resolve(__dirname, 'dist'),
        // match the output path

        publicPath: '/'
        // match the output `publicPath`
    },

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
                    use: styleLoaders,
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

        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new DashboardPlugin(),
        // loads webpack-dashboard

        new ExtractTextPlugin({
            filename: 'dist/main.css',
            disable: false,
            allChunks: true
        }),
        // Extract css to dist/main.css

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        // define the environment
    ],
};