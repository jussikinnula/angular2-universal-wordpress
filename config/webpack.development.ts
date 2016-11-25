const clone = require('js.clone');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const DefinePlugin = webpack.DefinePlugin;

import commonWebpackConfig, { root,  includeClientPackages } from './webpack.common';


export const commonPlugins = [];

export const commonConfig = {
    devtool: 'cheap-source-map'
};


// Client.
export const clientPlugins = [
    new DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
];

export const clientConfig = {};


// Server.
export const serverPlugins = [];

export const serverConfig = {};


export default [
    // Client
    webpackMerge(
        commonWebpackConfig[0],
        clone(commonConfig),
        clientConfig,
        { plugins: commonWebpackConfig[0].plugins.concat(commonPlugins, clientPlugins) }
    ),

    // Server
    webpackMerge(
        commonWebpackConfig[1],
        clone(commonConfig),
        serverConfig, 
        { plugins: commonWebpackConfig[1].plugins.concat(commonPlugins, serverPlugins) })
];
