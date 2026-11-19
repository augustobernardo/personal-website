// Usage: node scripts/csp-hashes.mjs <outDir> <destFile> | --self-test
// Writes an nginx CSP header with sha256 hashes of every inline executable <script> in the export.
// Trade-off: style-src keeps 'unsafe-inline' because React/Next emit style= attributes; CSS cannot run JS.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const JS_TYPES = new Set(["", "text/javascript", "module"]);

export function inlineScriptHashes(html) {
  const hashes = [];
  for (const [, attrs, body] of html.matchAll(SCRIPT_RE)) {
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const type = /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1].toLowerCase() ?? "";
    if (!JS_TYPES.has(type)) continue;
    hashes.push("sha256-" + createHash("sha256").update(body, "utf8").digest("base64"));
  }
  return hashes;
}

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? htmlFiles(join(dir, e.name))
      : e.name.endsWith(".html")
        ? [join(dir, e.name)]
        : [],
  );
}

function selfTest() {
  const html = `<script src="/a.js"></script><script type="application/ld+json">{"a":1}</script>
<script>alert(1)</script><script type="module">alert(1)</script><script async src="x">y</script>`;
  const got = inlineScriptHashes(html);
  assert.deepEqual(got, Array(2).fill("sha256-bhHHL3z2vDgxUt0W3dWQOrprscmda2Y5pLsLg4GF+pI="));
  console.log("self-test ok");
}

const [a, b] = process.argv.slice(2);
if (a === "--self-test") selfTest();
else if (a && b) {
  const files = htmlFiles(a);
  if (files.length === 0) {
    console.error(`no HTML found in ${a}`);
    process.exit(1);
  }
  const hashes = [
    ...new Set(files.flatMap((f) => inlineScriptHashes(readFileSync(f, "utf8")))),
  ].sort();
  const src = ["'self'", ...hashes.map((h) => `'${h}'`)].join(" ");
  const csp = `default-src 'self'; script-src ${src}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests`;
  writeFileSync(b, `add_header Content-Security-Policy "${csp}" always;\n`);
  console.log(`${hashes.length} script hashes from ${files.length} HTML files`);
} else {
  console.error("usage: csp-hashes.mjs <outDir> <destFile> | --self-test");
  process.exit(1);
}
