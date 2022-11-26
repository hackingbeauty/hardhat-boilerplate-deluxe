module.exports = {
  testEnvironment: 'jsdom',
  rootDir: '../',
  setupFiles: [
    '<rootDir>/tests/setup-test-mocks.js'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup-test-framework.js'
  ],
  collectCoverageFrom: [
    '**/src/**/*.js'
  ],
  moduleFileExtensions: [
    'js'
  ],
  moduleDirectories: [
    'node_modules',
    'src',
    'tests'
  ],
  roots: [
    'node_modules',
    'src'
  ],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '\\.(png|pdf|jpg|jpeg)$': 'jest-transform-stub',
    'tests/test-utils': '<rootDir>/tests/test-utils.js'
  },
  transform: {
    '^.+\\.svg$': '<rootDir>/tests/__transformers__/file-transformer.js',
    '^.+\\.js?$': 'babel-jest'
  }
}
