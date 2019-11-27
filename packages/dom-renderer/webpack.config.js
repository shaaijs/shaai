const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: __dirname + '/src',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        library: 'ScrollInk',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
        // host : '192.168.0.116',
    }
};