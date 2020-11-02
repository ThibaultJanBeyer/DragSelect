const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');
const docs = path.resolve(__dirname, 'docs');

module.exports = {
  entry: './src/DragSelect.js',
  output: {
    path: dist,
    filename: 'DragSelect.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [{ source: `${dist}/**/*`, destination: docs }]
        }
      }
    })
  ]
};
