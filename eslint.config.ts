// Ajout FlatCompat et utilitaires Node.js
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-unused-vars": "off",
      "no-console": "off",
      "no-undef": "off",
      "no-empty": "off",
      "no-prototype-builtins": "off",
    },
  },
];

export default eslintConfig;

// Ancienne configuration exportée, désormais commentée pour éviter le double export
// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   }
// );
