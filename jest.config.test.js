module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    transform: {
      '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: Add if you have setup files
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.js$)'], // Ensure JS files are transformed
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.spec.json', // Ensure this points to your tsconfig.spec.json
      },
    },
    testTimeout: 30000, // Optional: Adjust timeout as needed
  };
  