module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "airbnb",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-unused-vars": "warn",
    "comma-dangle": "off",
    "global-require": "off",
    "react/prefer-stateless-function": "off",
    "react/no-array-index-key": "warn",
    "linebreak-style": "off",
    "no-shadow": "off",
    "react/no-children-prop": "off",
    "react/jsx-filename-extension": "off",
    "eol-last": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "react/prop-types": "off",
    "import/extensions": "off",
    "indent": [2, 2, { "SwitchCase": 1 }],
    "object-curly-newline": "off",
    "import/first": "off",
    "consistent-return": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "prefer-promise-reject-errors": "off",
    "quote-props": "off",
    "max-len": [
      "warn",
      { "code": 140 }
    ]

  }
};