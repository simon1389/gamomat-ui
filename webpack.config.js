// const path = require("path");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const { CheckerPlugin } = require('awesome-typescript-loader');
// const CopyPlugin = require('copy-webpack-plugin');
// const PACKAGE = require('./package.json');
//
// // Library output details
// var FILE_NAME = "game";
// var LIBRARY_NAME = PACKAGE.name;
//
// // Build, source, etc paths
// var PATHS = {
//     entryPoint: path.resolve(__dirname, 'src/index.ts'),
//     dist: path.resolve(__dirname, 'dist/lib')
// }
//
// // Webpack config
// module.exports = {
//     mode: "production",
//     entry: {
//         [FILE_NAME]: [PATHS.entryPoint],
//         [FILE_NAME + '.min']: [PATHS.entryPoint]
//     },
//     output: {
//         path: PATHS.dist,
//         filename: '[name].js',
//         libraryTarget: 'umd',
//         library: LIBRARY_NAME,
//         umdNamedDefine: true
//     },
//     resolve: {
//         extensions: ['.ts', '.tsx', '.js']
//     },
//     optimization: {
//         minimize: false,
//         minimizer: [new UglifyJsPlugin({
//             include: /\.min\.js$/
//         })]
//     },
//     module: {
//         rules: [{
//             test: /\.tsx?$/,
//             loader: 'awesome-typescript-loader',
//             exclude: /node_modules/
//         }]
//     },
//     plugins: [
//         new CheckerPlugin(),
//         new CopyPlugin({
//             patterns: [
//                 {from: 'node_modules/pixi.js/dist/esm/pixi.js', to: PATHS.dist},
//     ]
// }),
//     ],
//     externals: [
//         {"pixi.js": "PIXI"},
//     ]
// }


const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({patterns:[
            { from: 'src/index.html' },
            { from: 'src/assets', to: 'assets' },
        ]}),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        hot: true
    },
    optimization: {
        minimize: false
    }
};

module.exports = config;
