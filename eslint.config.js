const js = require('@eslint/js')
const typescript = require('@typescript-eslint/eslint-plugin')
const typescriptParser = require('@typescript-eslint/parser')
const cypress = require('eslint-plugin-cypress')
const importPlugin = require('eslint-plugin-import')
const n = require('eslint-plugin-n')
const promise = require('eslint-plugin-promise')
const globals = require('globals')

module.exports = [
  // Base JS config for all JS files
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
        cy: 'readonly',
        Cypress: 'readonly'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  },
  // TypeScript config
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './cypress/tsconfig.json'],
        tsconfigRootDir: __dirname
      },
      globals: {
        ...globals.node,
        ...globals.jest,
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
        chai: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'cypress': cypress,
      'import': importPlugin,
      'n': n,
      'promise': promise
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'minimumDescriptionLength': 10
      }],
      
      // Standard JS rules
      'no-unused-vars': 'off', // Use TypeScript's version
      'no-undef': 'off', // TypeScript handles this
      'no-redeclare': 'off', // TypeScript handles this
      
      // Import rules
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'never'
      }],
      'import/no-duplicates': 'error',
      
      // Promise rules - adjusted for Cypress
      'promise/always-return': ['error', { ignoreLastCallback: true }],
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': ['error', { allowFinally: true }],
      
      // Node rules
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-missing-import': 'off', // TypeScript handles this
      
      // Cypress rules
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'warn', // Changed to warn
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'cypress/no-async-tests': 'error'
    }
  },
  // Cypress-specific overrides
  {
    files: ['cypress/**/*.{js,ts}'],
    rules: {
      'promise/always-return': 'off', // Cypress commands don't need returns
      'promise/catch-or-return': 'off' // Cypress handles errors differently
    }
  },
  // Test file overrides
  {
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}', '__test__/**/*.{js,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'cypress.config.js',
      'cypress.config.ts',
      'jest.config.js',
      'jest.config.ts',
      'eleventy-page/**',
      '*.d.ts' // Ignore type definition files
    ]
  }
]