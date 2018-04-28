const path = require('path');
const outputDir = path.join(__dirname, "../../priv/static/js");

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/Index.bs.js',
  mode: isProd ? 'production' : 'development',
  output: {
    path: outputDir,
    publicPath: outputDir,
    filename: 'app.js',
  },
};
