import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist', 'lib'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
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
        },
    },
)
