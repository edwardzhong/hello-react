const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: resolve(__dirname, '.temp_cache'),
    buildDependencies: {
      config: [__filename],
    },
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: 'single',
    splitChunks: {
      minSize: 100000,
      maxSize: 300000,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/, //test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10,
          name: 'base',
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          priority: 9,
          minChunks: 2,
          name: 'vendors',
        },
        styles: {
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
          name: 'styles',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader?cacheDirectory',
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      // {
      //     test: /\.scss$/i,
      //     exclude: /node_modules/,
      //     use: [          {
      //         loader: MiniCssExtractPlugin.loader,
      //         options: {
      //           hmr: devMode,
      //         },
      //     },
      //     {
      //         loader: 'css-loader',
      //         options: {
      //             importLoaders: 3,
      //             modules: {
      //                 mode: 'local',
      //                 context: resolve(__dirname, 'src/'),
      //                 localIdentName: '[path][local]_[hash:base64:5]',//'[path][name]_[local]_[hash:base64:5]'
      //             }
      //         },
      //     },
      //     'postcss-loader',
      //     'sass-loader',
      //     {
      //         loader: 'sass-resources-loader',
      //         options: {
      //             resources: [ resolve(__dirname,'src/base.scss') ]
      //         }
      //     }]
      // },
      {
        test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'img/[name].[ext]'
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'font/[name].[ext]'
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.png',
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      ignoreOrder: true,
    }),
    new HotModuleReplacementPlugin(), //HMR
  ],
};
