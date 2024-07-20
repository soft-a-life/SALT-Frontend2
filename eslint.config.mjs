export default {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['react-app', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'space-before-function-paren': ['error', 'never'],
    },
};
