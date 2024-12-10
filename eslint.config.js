import eslintPluginImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import eslintRecommended from '@eslint/js';

export default [
  {
    ignores: ['node_modules/**']
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        console: 'readonly',
        alert: 'readonly'
      }
    },
    plugins: {
      import: eslintPluginImport,
      prettier
    },
    rules: {
      ...eslintRecommended.configs.recommended.rules,
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: 'res|next|^err'
        }
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'no-param-reassign': [
        'error',
        {
          props: false
        }
      ],
      'no-console': 'warn',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'func-names': 'off',
      'space-unary-ops': 'error',
      'space-in-parens': 'error',
      'space-infix-ops': 'error',
      'comma-dangle': 'off',
      'max-len': 'off',
      'import/extensions': 'off',
      'no-underscore-dangle': 'off',
      'import/namespace': 'off',
      'consistent-return': 'off',
      radix: 'off',
      'no-shadow': [
        'error',
        {
          hoist: 'all',
          allow: ['resolve', 'reject', 'done', 'next', 'err', 'error']
        }
      ],
      'no-unused-expressions': 'off'
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs']
        }
      }
    }
  }
];
