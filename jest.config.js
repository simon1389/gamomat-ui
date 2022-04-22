/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
    setupFiles: [
        './tests/mocks/client.js'
    ],
    transform: {}
};
