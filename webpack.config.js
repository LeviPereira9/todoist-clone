const path = require('path');

module.exports = {
  module: {
    rules: [
        {
            test: /app\.scss$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'resolve-url-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: true }
              }
            ]
          }
    ]
  }
};