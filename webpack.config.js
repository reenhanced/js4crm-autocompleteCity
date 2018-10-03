const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'eval-source-map',
  target: 'web',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: [/node_modules/, /spec\.ts/]
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    // The library string below is how this will be exposed to CRM
    // You can access any exported function from index.ts like this:
    // `javascriptForCrm.OnLoad` which can be used for things like form script events
    library: 'javascriptForCrm',
    path: path.resolve(__dirname, 'dist')
  }
};