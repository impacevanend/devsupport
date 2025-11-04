export default {
  testEnvironment: 'node',
  verbose: true,

  // dónde están los tests
  roots: ['<rootDir>/tests'],

  // no usamos transform (todo es ESM nativo)
  transform: {},

  // extensiones que Jest debe resolver
  moduleFileExtensions: ['js', 'json'],

  // cobertura (opcional)
  collectCoverageFrom: ['src/**/*.js', '!src/server.js'],

  // cargar variables de entorno de .env
  setupFiles: ['dotenv/config'],

  // desconectar Prisma al terminar toda la corrida
  globalTeardown: '<rootDir>/tests/utils/teardown.js',
};
