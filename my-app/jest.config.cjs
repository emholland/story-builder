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
  ],
    moduleNameMapper: {
      // Map Vite-specific import.meta
      '^import\\.meta\\.env': JSON.stringify({ VITE_API_URL: 'your-api-url' }),
    },
    globals: {
        'import.meta': {
            env: {
                VITE_API_URL: 'http://localhost:5001',
                },
            },
        },
};


