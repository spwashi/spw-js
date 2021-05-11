// eslint-disable-next-line no-undef
module.exports = {
    preset:           'ts-jest',
    moduleNameMapper: {
        '@constructs/(.*)': '<rootDir>/src/constructs/$1',
        '@grammar/(.*)':    '<rootDir>/src/parser/grammar/$1',
    },
}