const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'assets'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'src', 'views'),
        publicPath: 'http://localhost:8080/assets/'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
                options: {
                    cacheDirectory: 'babel_cache',
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap!sass-loader?sourceMap'
                })
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                sassLoader: {
                    includePaths: [path.resolve(__dirname, 'src', 'sass')],
                },
                context: '/'
            }
        }),
        new ExtractTextPlugin('styles.css'),
    ],
};
