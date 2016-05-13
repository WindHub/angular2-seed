var webpack = require('webpack');
var path = require('path');

module.exports = (debug) => {
  config = {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills'],
        minChunks: Infinity
      }),
    ],

    module: {
      loaders: [
        // .ts files for TypeScript
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
        },

      ],
      preLoaders: [{
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular2-material'),
        ]
      }],
      noParse: [
        path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
        path.join(__dirname, 'node_modules', 'angular2', 'bundles')
      ]
    },

    resolve: {
      root: [path.join(__dirname, 'src')],
      extensions: ['', '.ts', '.js']
    },

    devServer: {
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },

    node: {
      global: 1,
      crypto: 'empty',
      module: 0,
      Buffer: 0,
      clearImmediate: 0,
      setImmediate: 0
    }
  };
  if(debug) {
    config.devtool = 'cheap-module-eval-source-map';
    config.watch = true;
  }
  return config;
};
