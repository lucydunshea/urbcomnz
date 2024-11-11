const path = require('path');

module.exports = {
  entry: ['./static/js/scripts.js', './static/js/map.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/js')
  },
  mode: 'development' // Change to 'production' for minified files
};
