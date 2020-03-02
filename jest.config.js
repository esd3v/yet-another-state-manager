module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
  // setupFilesAfterEnv: ['./jest.setup.tsx'],
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/public/'],
  modulePaths: ["<rootDir>/src/"],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
};
