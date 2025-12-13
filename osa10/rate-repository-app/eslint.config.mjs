import globals from "globals";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import jest from "eslint-plugin-jest";
import babelParser from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  react.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: {
        ...globals.browser,
      }
    },
  plugins: {
    react,
    "react-native": reactNative,
    jest,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "quotes": ["error", "double"],
    "semi": ["error", "always"]
  },
},
]);
