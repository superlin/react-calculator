var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: {
    demo: [
      'webpack-dev-server/client?http://10.210.97.235:3000',
      'webpack/hot/only-dev-server',
      './demo/demo'
    ]
  },
  output: {
    path: path.join(__dirname, '/'),
    filename: '[name].entry.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'react-hot!babel',
      include: [path.join(__dirname, 'src'), path.join(__dirname, 'demo')]
    }, {
      test: /\.scss$/,
      loader: 'style!css!autoprefixer!sass'
    }, {
      test: /\.css$/,
      loader: 'style!css!autoprefixer'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
