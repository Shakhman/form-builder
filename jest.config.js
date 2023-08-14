module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/main.ts',
    '!src/**/*.stories.js',
  ],
  clearMocks: true,
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!vuetify)'],
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/tests/unit/setup.ts', 'jest-canvas-mock'],
  testMatch: [
    '**/?(*.)+(spec).ts?(x)',
  ],
};
