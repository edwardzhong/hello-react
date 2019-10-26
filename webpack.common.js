const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },  
    optimization: { 
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        runtimeChunk: 'single',
        splitChunks: {
            minSize:100000,
            maxSize:300000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,//test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name:'base',
                    priority: 10,
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                    priority: 20, 
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            {
                test: /\.css$/i,
                use:[{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode,
                        },
                    },
                    'css-loader',
                ],          
            },
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: [          {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      hmr: devMode,
                    },
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 3,
                        modules: {
                            mode: 'local',
                            context: resolve(__dirname, 'src/'),
                            localIdentName: '[path][local]_[hash:base64:5]',//'[path][name]_[local]_[hash:base64:5]'
                        }
                    },
                },
                'postcss-loader', 
                'sass-loader',
                { 
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [ resolve(__dirname,'public/base.scss') ]
                    }
                }]
            },
            {
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
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            favicon: './public/favicon.png',
            minify: {
                removeAttributeQuotes:true,
                removeComments: true,
                collapseWhitespace: true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true
             },
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            ignoreOrder: true,    
        }),
        new HotModuleReplacementPlugin()//HMR
    ]
};