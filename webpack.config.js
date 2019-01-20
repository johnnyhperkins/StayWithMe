const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  // const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' })
  return {
    entry: './frontend/index.jsx',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: [/\.jsx?$/],
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '*'],
    },
    devtool: 'inline-source-map'
  };
} 