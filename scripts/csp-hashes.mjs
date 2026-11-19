// Usage: node scripts/csp-hashes.mjs <outDir> <destFile> | --self-test
// Writes an nginx CSP header with sha256 hashes of every inline executable <script> in the export.
// Trade-off: style-src keeps 'unsafe-inline' because React/Next emit style= attributes; CSS cannot run JS.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const ATTR_RE = /([^\s"'=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
// JavaScript MIME type essences from the HTML Standard, plus "module".
const JS_TYPES = new Set([
  "application/ecmascript",
  "application/javascript",
  "application/x-ecmascript",
  "application/x-javascript",
  "text/ecmascript",
  "text/javascript",
  "text/javascript1.0",
  "text/javascript1.1",
  "text/javascript1.2",
  "text/javascript1.3",
  "text/javascript1.4",
  "text/javascript1.5",
  "text/jscript",
  "text/livescript",
  "text/x-ecmascript",
  "text/x-javascript",
  "module",
]);

function parseAttrs(attrs) {
  const map = new Map();
  for (const [, name, dq, sq, bare] of attrs.matchAll(ATTR_RE)) {
    const key = name.toLowerCase();
    if (!map.has(key)) map.set(key, dq ?? sq ?? bare ?? "");
  }
  return map;
}

// Mirrors the HTML "prepare the script element" type rules for inline scripts.
function isExecutable(attrs) {
  const type = attrs.get("type");
  if (type === undefined || type === "") {
    const language = attrs.get("language");
    return !language || JS_TYPES.has(`text/${language.trim().toLowerCase()}`);
  }
  const essence = type.split(";")[0].trim().toLowerCase();
  return essence === "" || JS_TYPES.has(essence);
}

export function inlineScriptHashes(html) {
  const hashes = [];
  for (const [, rawAttrs, body] of html.matchAll(SCRIPT_RE)) {
    const attrs = parseAttrs(rawAttrs);
    if (attrs.has("src") || !isExecutable(attrs)) continue;
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
  const alert1 = "sha256-bhHHL3z2vDgxUt0W3dWQOrprscmda2Y5pLsLg4GF+pI=";
  const skipped = `<script src="/a.js"></script><script type="application/ld+json">{"a":1}</script>
<script async src="x">y</script><script SRC=x>y</script><script type="text/template">alert(1)</script>`;
  assert.deepEqual(inlineScriptHashes(skipped), []);
  const executable = `<script>alert(1)</script><script type="module">alert(1)</script>
<script type="application/javascript">alert(1)</script><script type=" Text/JavaScript; charset=utf-8">alert(1)</script>
<script data-src="tracking">alert(1)</script><script type="">alert(1)</script><script language="javascript">alert(1)</script>`;
  assert.deepEqual(inlineScriptHashes(executable), Array(7).fill(alert1));
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
