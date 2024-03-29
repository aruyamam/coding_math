const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: ['./src/js/index.js'],
   output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'js/bundle.js',
   },
   devServer: {
      contentBase: './public',
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './src/index.html',
      }),
   ],
   devtool: 'source-map',
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            },
         },
      ],
   },
};
