/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint.
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
// eslint:disable
module.exports = {
    'root': true,
    'ignorePatterns': 'projects/**/*',
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'project': 'tsconfig.json',
        'sourceType': 'module',
        'createDefaultProgram': true,
    },
    'plugins': [
        '@angular-eslint/eslint-plugin',
        'eslint-plugin-import',
        'eslint-plugin-jsdoc',
        'eslint-plugin-prefer-arrow',
        '@typescript-eslint'
    ],
    'rules': {
        '@angular-eslint/component-class-suffix': [
            'error',
            {
                'suffixes': [
                    'Component',
                    'View',
                    'Page',
                    'Dialog',
                    'Widget'
                ]
            }
        ],
        '@angular-eslint/component-selector': [
            'error',
            {
                'type': 'element',
                'prefix': [
                    'apollo'
                ],
                'style': 'kebab-case'
            }
        ],
        '@angular-eslint/directive-class-suffix': 'error',
        '@angular-eslint/directive-selector': [
            'error',
            {
                'type': 'attribute',
                'prefix': [
                    'apollo'
                ],
                'style': 'camelCase'
            }
        ],
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
            'error',
            {
                'default': 'array'
            }
        ],
        '@typescript-eslint/ban-types': [
            'error',
            {
                'types': {
                    'Object': {
                        'message': 'Avoid using the `Object` type. Did you mean `object`?'
                    },
                    'Function': {
                        'message': 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
                    },
                    'Boolean': {
                        'message': 'Avoid using the `Boolean` type. Did you mean `boolean`?'
                    },
                    'Number': {
                        'message': 'Avoid using the `Number` type. Did you mean `number`?'
                    },
                    'String': {
                        'message': 'Avoid using the `String` type. Did you mean `string`?'
                    },
                    'Symbol': {
                        'message': 'Avoid using the `Symbol` type. Did you mean `symbol`?'
                    },
                    '{}': false,
                }
            }
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                'accessibility': 'explicit',
                'overrides': {
                    'constructors': 'off'
                }
            }
        ],
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                'SwitchCase': 1,
                'FunctionExpression': {
                    'parameters': 'first',
                }
            }
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                'multiline': {
                    'delimiter': 'semi',
                    'requireLast': true
                },
                'singleline': {
                    'delimiter': 'comma',
                    'requireLast': false
                }
            }
        ],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                'default': [
                    // Index signature
                    'signature',

                    // Fields
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',

                    'public-decorated-field',
                    'protected-decorated-field',
                    'private-decorated-field',

                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',

                    'public-abstract-field',
                    'protected-abstract-field',
                    'private-abstract-field',

                    'public-field',
                    'protected-field',
                    'private-field',

                    'static-field',
                    'instance-field',
                    'abstract-field',

                    'decorated-field',

                    'field',

                    // Constructors
                    'public-constructor',
                    'protected-constructor',
                    'private-constructor',

                    'constructor',

                    // Methods
                    'public-method',
                    'protected-method',
                    'private-method',

                    'public-decorated-method',
                    'protected-decorated-method',
                    'private-decorated-method',

                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',

                    'public-abstract-method',
                    'protected-abstract-method',
                    'private-abstract-method',

                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',

                    'static-method',
                    'instance-method',
                    'abstract-method',

                    'decorated-method',

                    'method',
                ],
            },
        ],
        '@typescript-eslint/prefer-regexp-exec': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-empty-function': [
            'error',
            {
                'allow': [
                    'constructors',
                ]
            }
        ],
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-shadow': [
            'error',
            {
                'hoist': 'all'
            }
        ],
        '@typescript-eslint/no-for-in-array': 'off',
        '@typescript-eslint/no-unused-vars': [ 'error', { 'argsIgnorePattern': '^_' } ],
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/keyword-spacing': 'error',
        'array-bracket-spacing': [ 'error', 'always' ],
        'computed-property-spacing': [ 'error', 'always' ],
        '@typescript-eslint/object-curly-spacing': [ 'error', 'always' ],
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                'avoidEscape': true
            }
        ],
        '@typescript-eslint/semi': [
            'error',
            'always'
        ],
        '@typescript-eslint/triple-slash-reference': [
            'error',
            {
                'path': 'always',
                'types': 'prefer-import',
                'lib': 'always'
            }
        ],
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        'arrow-body-style': 'off',
        'complexity': 'off',
        'constructor-super': 'error',
        'curly': 'error',
        'brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],
        'eol-last': 'error',
        'eqeqeq': [
            'error',
            'smart'
        ],
        'guard-for-in': 'off',
        'id-blacklist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined'
        ],
        'id-match': 'error',
        'import/no-deprecated': 'warn',
        'jsdoc/check-alignment': 'off',
        'jsdoc/check-indentation': 'off',
        'jsdoc/newline-after-description': 'off',
        'prefer-template': 'error',
        'max-classes-per-file': [
            'error',
            1
        ],
        'camelcase': [
            'error',
            {
                'properties': 'never',
            }
        ],
        'max-len': [
            'error',
            {
                'ignorePattern': '^import',
                'code': 192
            }
        ],
        'new-parens': 'error',
        'no-bitwise': 'off',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': [
            'error',
            {
                'allow': [
                    'log',
                    'dirxml',
                    'warn',
                    'error',
                    'dir',
                    'timeLog',
                    'assert',
                    'clear',
                    'count',
                    'countReset',
                    'group',
                    'groupCollapsed',
                    'groupEnd',
                    'table',
                    'Console',
                    'markTimeline',
                    'profile',
                    'profileEnd',
                    'timeline',
                    'timelineEnd',
                    'timeStamp',
                    'context'
                ]
            }
        ],
        'no-debugger': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-invalid-this': 'off',
        'no-new-wrappers': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': [
            'error',
            'never'
        ],
        'prefer-arrow/prefer-arrow-functions': 'off',
        'prefer-const': 'error',
        'radix': 'error',
        'space-before-function-paren': [
            'error',
            {
                'anonymous': 'never',
                'asyncArrow': 'always',
                'named': 'never'
            }
        ],
        'spaced-comment': [
            'error',
            'always',
            {
                'exceptions': [ '*' ],
                'markers': [ '/', '#region', '#endregion' ],
            }
        ],
        'use-isnan': 'error',
        'valid-typeof': 'off',
    }
};
