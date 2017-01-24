const clone = require('js.clone');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const DefinePlugin = webpack.DefinePlugin;

import { root, includeClientPackages } from './helpers';
import * as commonWebpackConfig from './webpack.common';

export const plugins = [
    new DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
];

export const config = {
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: './src',
        historyApiFallback: true,
        host: 'localhost',
        port: 5000,
        stats: {
            cached: true,
            cachedAssets: true,
            chunks: true,
            chunkModules: false,
            colors: true,
            hash: false,
            reasons: true,
            timings: true,
            version: false
        }
    }
};

export default webpackMerge(
    commonWebpackConfig[0],
    config,
    { plugins: commonWebpackConfig[0].plugins.concat(plugins) }
);
