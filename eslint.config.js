import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist', 'lib',], },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended,],
        // files: ['**/*.ts', '**/*.js',],
        languageOptions: {
            ecmaVersion: 2020,
        },
        plugins: {},
        rules: {
            indent: ['error', 4, {
                SwitchCase: 1,
                ignoredNodes: ['TemplateLiteral',],
            },],
            '@typescript-eslint/no-unused-vars': [1,],
            semi: [2, 'always',],
            'comma-dangle': [
                'error', {
                    arrays: 'always',
                    objects: 'always',
                    imports: 'never',
                    exports: 'never',
                    functions: 'never',
                },
            ],
            'comma-spacing': 1,
            'no-trailing-spaces': 1,
            quotes: ['error', 'single',],
            'quote-props': [1, 'as-needed',],
            'no-multi-spaces': [1,],
            'key-spacing': [1,],
            'object-curly-spacing': [2, 'always',],
            'no-extra-parens': [1,],
            'space-infix-ops': ['error', { int32Hint: false, },],
            'space-before-blocks': [1,],
            'keyword-spacing': 1,
            'brace-style': [1, 'stroustrup',],
            'space-before-function-paren': [1, { anonymous: 'always', named: 'never', asyncArrow: 'always', },],
            '@typescript-eslint/no-unused-expressions': 0,
        },
    }
);
