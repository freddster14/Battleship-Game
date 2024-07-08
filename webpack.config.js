const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
            test: /\.css$/,
            use: [{ loader: MiniCssExtractPlugin.loader,}, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|wav)$/i,
        type: 'asset/resource',
       
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
  ],

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
 
};