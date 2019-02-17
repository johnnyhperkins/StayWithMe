const path = require('path');

module.exports = () => {
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
    devtool: 'source-map'
  };
} 