/* eslint-env node */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    ignorePatterns: [ 'dist', 'node_modules' ],
    extends: [
        'regani-ts'
    ],
    env: {
        browser: true,
        es6: true
    },
    globals: {
        EventListener: 'readonly'
    }
}