export default {
  testEnvironment: 'node',
  verbose: true,

  
  roots: ['<rootDir>/tests'],

  
  transform: {},

 
  moduleFileExtensions: ['js', 'json'],

  collectCoverageFrom: ['src/**/*.js', '!src/server.js'],

  setupFiles: ['dotenv/config'],

  globalTeardown: '<rootDir>/tests/utils/teardown.js',
};
