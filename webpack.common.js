const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',//单入口
    output: {
        path: resolve(__dirname, 'dist'),
        // publicPath: '/public/',//虚拟目录
        // filename: 'bundle.js'
        filename: '[name].[hash].js'//输出文件添加hash
    },
    optimization: { // 代替commonchunk, 代码分割
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']//'eslint-loader'
            },
            {   /*
                使用 html-loader, 将 html 内容存为 js 字符串，比如当遇到
                import htmlString from './template.html';
                template.html 的文件内容会被转成一个 js 字符串，合并到 js 文件里。
                */
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,//css modules
                            localIdentName: '[name]___[local]___[hash:base64:5]'
                        },
                    },
                    'postcss-loader', 'sass-loader']
            },
            {   /* 
                当文件体积小于 limit 时，url-loader 把文件转为 Data URI 的格式内联到引用的地方
                当文件大于 limit 时，url-loader 会调用 file-loader, 把文件储存到输出目录，并把引用的文件路径改写成输出后的路径 
                */
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),//生成新文件时，清空生出目录
        new HtmlWebpackPlugin({
            template: './public/index.html',//模版路径
            filename: 'index.html',//生成后的文件名,默认index.html
            favicon: './public/favicon.png',
            minify: {
                removeAttributeQuotes:true,
                removeComments: true,
                collapseWhitespace: true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true
             },
            // chunksSortMode:'none'//和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
        }),
        new HotModuleReplacementPlugin()//HMR
    ]
};