// babel.config.cjs
module.exports = {
  presets: [
    '@babel/preset-env', // For handling modern JavaScript syntax
    '@babel/preset-react', // If using React
  ],
  plugins: [
    '@babel/plugin-syntax-import-meta'
    //'@babel/plugin-transform-runtime'
    //'@babel/plugin-transform-modules-commonjs', // Ensures compatibility with Jest
  ],
};