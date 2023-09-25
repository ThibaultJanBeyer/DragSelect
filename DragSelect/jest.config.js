module.exports = {
  verbose: true,
  preset: 'jest-puppeteer',
  modulePathIgnorePatterns: ['<rootDir>/__tests__/helpers'],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: './coverage/',
}
