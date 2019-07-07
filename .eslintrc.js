module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
      'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      'plugin:prettier/recommended',
      'plugin:react/recommended'
    ],
    plugins: [
      'react-hooks'
    ],
    parserOptions:  {
      ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
      sourceType:  'module',  // Allows for the use of imports
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-use-before-define': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'warn'
    }
  };