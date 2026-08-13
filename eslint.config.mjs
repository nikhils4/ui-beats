import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

/**
 * Flat config. `eslint-config-next` v16 ships native flat configs, so there is
 * no `FlatCompat`/`.eslintrc` shim here.
 *
 * The old setup was a three-line `.eslintrc.json` extending only
 * `next/core-web-vitals`, which meant none of the TypeScript rules ran.
 */
const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "public/r/**",
      "next-env.d.ts",
      // Standalone packages carry their own toolchain; the site's Next-flavoured
      // rules do not apply to a stdio server that never touches the DOM.
      "packages/**",
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      // framer-motion was renamed; keep stale imports from creeping back in.
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "framer-motion",
              message:
                "framer-motion is now `motion` — import from `motion/react`.",
            },
            {
              name: "react-intersection-observer",
              message: "Use `useInView` from `motion/react` instead.",
            },
          ],
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "smart"],
      "prefer-const": "error",
    },
  },

  {
    // Node-side scripts legitimately log.
    files: ["scripts/**/*.ts", "*.config.{js,mjs,ts}"],
    rules: { "no-console": "off" },
  },

  {
    files: ["tests/**/*.{ts,tsx}"],
    rules: { "@typescript-eslint/no-non-null-assertion": "off" },
  },

  prettier,
];

export default config;
