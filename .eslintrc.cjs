/**
 * ESLint configuration aligned with Google's TypeScript recommendations.
 * Uses @typescript-eslint for TS rules and integrates Prettier for formatting.
 */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2022,
    sourceType: "module",
  },
  env: {
    node: true,
    es2022: true,
  },
  extends: ["google", "plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["@typescript-eslint"],
  rules: {
    // Google style requires JSDoc; disable if project prefers fewer JSDoc requirements
    "require-jsdoc": "off",
    // Allow some practical flexibilities for the project
    "@typescript-eslint/no-explicit-any": "off",
    // Express's Router is capitalized but used without `new` — disable false-positive
    "new-cap": "off",
    "max-len": ["error", { code: 100 }],
    "import/no-unresolved": "off",
  },
};
