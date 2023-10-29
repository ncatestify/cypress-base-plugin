export default {
  testEnvironment: 'node',
  testMatch: ['**/__test__/**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'json']
}
