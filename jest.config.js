module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/test/**/*.test.js'],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
