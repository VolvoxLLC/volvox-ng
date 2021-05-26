module.exports = {
    'extends': '../../.eslintrc.js',
    'parserOptions': {
        'tsconfigRootDir': __dirname,
        'project': [
            'tsconfig.lib.json',
            'tsconfig.spec.json',
        ],
    },
};