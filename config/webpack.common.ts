const autoprefixer = require('autoprefixer');
const clone = require('js.clone');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;

import { root, includeClientPackages } from './helpers';

// Common
export var commonPlugins = [
    new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        root('./src')
    ),
    new ExtractTextPlugin('assets/css/styles.css'),
    new LoaderOptionsPlugin({
        debug: false,
        options: {
            postcss: [
                autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
            ],
            resolve: {}
        }
    })
];

export var commonConfig = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [ root('node_modules') ]
    },
    context: root('./'),
    output: {
        filename: '[name]',
        path: root('target'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.pug/,
                loader: 'pug-html-loader'
            },
            {
                test: /\.styl$/,
                include: [root('./src/app')],
                exclude: [root('./src/styles')],
                loaders: ['raw-loader', 'postcss-loader', 'stylus-loader']
            },
            {
                test: /\.styl$/,
                include: [root('./src/styles')],
                exclude: [root('./src/app')],
                loader: ExtractTextPlugin.extract('raw-loader!postcss-loader!stylus-loader')
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],
    }
};

// Client.
export var clientPlugins = [
    new CopyWebpackPlugin([
        {
            from: 'src/images',
            to: 'assets/images'
        }
    ]),
    new DefinePlugin({
        'process.env.WP_HOME': JSON.stringify(process.env['WP_HOME'] || 'http://localhost:5001')
    }),
    new FaviconsWebpackPlugin({
        logo: './src/favicon.png',
        prefix: 'assets/favicon/',
        emitStats: false,
        statsFilename: 'iconstats.json',
        inject: true,
        background: '#ff0000',
        title: 'MyApp'
    }),
    new HtmlWebpackPlugin({
        chunksSortMode: 'auto',
        filename: 'index.html',
        hash: true,
        inject: 'body',
        template: './src/index.pug'
    })
];

export var clientConfig = {
    target: 'web',
    entry: {
        'assets/js/main.js': './src/client',
    },
    output: {
        filename: '[name]',
        chunkFilename: 'assets/js/[chunkhash].js'
    },
    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false
    }
};


// Server.
export var serverPlugins = [];

export var serverConfig = {
    target: 'node',
    entry: {
        'server/index.js': './src/server'
    },
    output: {
        chunkFilename: 'chunk-[name].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /@angular(\\|\/)material/,
                loader: 'imports-loader?window=>global'
            }
        ]
    },
    externals: includeClientPackages(
        /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
    ),
    node: {
        global: true,
        crypto: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false
    }
};

export default [
    // Client
    webpackMerge(clone(commonConfig), clientConfig, { plugins: clientPlugins.concat(commonPlugins) }),

    // Server
    webpackMerge(clone(commonConfig), serverConfig, { plugins: serverPlugins.concat(commonPlugins) })
];