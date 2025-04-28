/*export default {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
}; */

// jest.config.cjs
module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: [
      '/node_modules/(?!openai)/',
  ], // Optional: Default behavior, can be removed
};


