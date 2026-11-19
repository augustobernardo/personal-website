// Lightweight toolkit profile: static site without persistence or server logger,
// so the Drizzle and data-boundary guards are intentionally omitted.
import { defineConfig } from "eslint/config";
import base from "./eslint-rules/next-base.mjs";

export default defineConfig([
  ...base,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "quality/no-direct-console": ["error", { logger: "nothing (remove client debug output)" }],
    },
  },
]);
