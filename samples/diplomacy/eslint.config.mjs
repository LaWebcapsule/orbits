import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import wbceOrbitsPlugin from "@wbce/eslint-plugin-orbits"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
    "**/*.js",
     "**/*.mjs",
    "**/*.d.ts",
    "**/node_modules/",
    "**/*.generated.ts",
    "**/coverage",
    "!**/.projenrc.ts",
    "!projenrc/**/*.ts",
]), {
    files: ['src/**/*.ts'],
    extends: fixupConfigRules(compat.extends("plugin:import/typescript")),

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "@stylistic": stylistic,
        "@wbce/eslint-plugin-orbits": wbceOrbitsPlugin
    },

    languageOptions: {
        globals: {
            ...globals.jest,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2018,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.dev.json",
        },
    },

    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },

        "import/resolver": {
            node: {},

            typescript: {
                project: "./tsconfig.dev.json",
                alwaysTryTypes: true,
            },
        },
    },

    rules: {
        indent: ["off"],
        "@stylistic/indent": ["error", 2],
        "@wbce/eslint-plugin-orbits/noDoRule": ["error"],
        "@wbce/eslint-plugin-orbits/noAsyncRule": ["error"],

        quotes: ["error", "single", {
            avoidEscape: true,
        }],

        "comma-dangle": ["error", "always-multiline"],

        "comma-spacing": ["error", {
            before: false,
            after: true,
        }],

        "no-multi-spaces": ["error", {
            ignoreEOLComments: false,
        }],

        "array-bracket-spacing": ["error", "never"],
        "array-bracket-newline": ["error", "consistent"],
        "object-curly-spacing": ["error", "always"],

        "object-curly-newline": ["error", {
            multiline: true,
            consistent: true,
        }],

        "object-property-newline": ["error", {
            allowAllPropertiesOnSameLine: true,
        }],

        "keyword-spacing": ["error"],

        "brace-style": ["error", "1tbs", {
            allowSingleLine: true,
        }],

        "space-before-blocks": ["error"],
        curly: ["error", "multi-line", "consistent"],
        "@stylistic/member-delimiter-style": ["error"],
        semi: ["error", "always"],

        "max-len": ["error", {
            code: 150,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
        }],

        "quote-props": ["error", "consistent-as-needed"],
        "@typescript-eslint/no-require-imports": ["error"],

        "no-shadow": ["off"],
        "@typescript-eslint/no-shadow": ["error"],
        "key-spacing": ["error"],
        "no-multiple-empty-lines": ["error"],
        "@typescript-eslint/no-floating-promises": ["error"],
        "no-return-await": ["off"],
        "@typescript-eslint/return-await": ["error"],
        "no-trailing-spaces": ["error"],
        "dot-notation": ["error"],
        "no-bitwise": ["error"],

        "@typescript-eslint/member-ordering": ["error", {
            default: [
                "public-static-field",
                "public-static-method",
                "protected-static-field",
                "protected-static-method",
                "private-static-field",
                "private-static-method",
                "field",
                "constructor",
                "method",
            ],
        }],
    },
}, {
    files: ["**/.projenrc.ts"],

    rules: {
        "@typescript-eslint/no-require-imports": "off",
        "import/no-extraneous-dependencies": "off",
    },
}]);