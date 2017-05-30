const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log('DIRNAME IS ' + __dirname);

module.exports = {
    entry: {
        app: ['./app/app.js'],
        styles: ['./app/assets/css/main.css'],
    },
    output: {
            filename: 'js/[name].js',
            path: __dirname + '/web',
            publicPath: '/',
            library: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    loader:  'css-loader'
                })
            },

            /** for bootstrap
             * include to package.json
             * "file-loader": "^0.10.0",
             * "url-loader": "^0.5.7",
             */
            // {
            //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            //     loader: 'url-loader?limit=100000'
            // },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),

        new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1 && module.context.indexOf('react-hot-loader') < 0;
            }
        })
    ],
    watchOptions: {
      poll: 500,
      ignored: /node_modules/
    }
}
