
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "semi": ["error", "never"],
        "no-unused-vars": ["warning", { "vars": "local", "args": "after-used", "ignoreRestSiblings": false }]
    },
}
