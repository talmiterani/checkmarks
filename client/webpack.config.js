const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].js',
        publicPath: '/'
    },
    resolve: {
        symlinks: false,
        alias: {
            'vue$': path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js'),
            '^vuetify': path.resolve(__dirname, 'node_modules/vuetify'),//this is for js error receive from vuetify https://github.com/vuetifyjs/vuetify/discussions/4068
            '@':  path.join(__dirname, '..', 'src')

        },
        extensions: ['.js', '.vue', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/, use: 'babel-loader'
            },
            {
                test: /\.vue$/, use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.s([c|a])ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires >= sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
                }
            },
        ]
    },
    devServer: {
        open: true,
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join('/', 'index.html') },
            ],
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env': require('./config/local.env')
        }),
        new CopyWebpackPlugin([
            // { use only when i have static folder
            //     from: path.resolve(__dirname, '../static'),
            //     to: 'static',
            //     ignore: ['.*']
            // }
        ]),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};