// http://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: "egg",
  // required to lint *.vue files
  // add your custom rules here
  rules: {
    "global-require": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "spaced-comment": 0,
    "no-console": 0,
    "no-empty": 0,
    camelcase: 0,
    "linebreak-style": 0,
    "no-restricted-syntax": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
};
