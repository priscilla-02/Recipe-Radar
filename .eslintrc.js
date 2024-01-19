module.exports = {
  root: false,
  env: {
    node: true
  },
  lintOnSave: false,
  extends: ["plugin:vue/recommended", "@vue/airbnb"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/no-cycle": "off",
    quotes: [
      "error",
      "double",
      { avoidEscape: true, allowTemplateLiterals: false }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
