export type CspSummary = {
  scriptHashes: number;
  unsafeInline: boolean;
  frameAncestorsNone: boolean;
  objectSrcNone: boolean;
};

// script-src falls back to default-src, as browsers do. Absent differs from empty: empty means 'none'.
function effectiveScripts(directives: Map<string, string[]>): string[] | undefined {
  return directives.get("script-src") ?? directives.get("default-src");
}

// Browsers honor only the first occurrence of a repeated directive.
function parseCsp(value: string): Map<string, string[]> {
  const directives = new Map<string, string[]>();
  for (const directive of value.split(";")) {
    const [name, ...tokens] = directive.trim().split(/\s+/);
    const key = name.toLowerCase();
    if (key && !directives.has(key)) directives.set(key, tokens);
  }
  return directives;
}

export function summarizeCsp(value: string): CspSummary {
  const directives = parseCsp(value);
  const scripts = effectiveScripts(directives) ?? [];
  return {
    scriptHashes: scripts.filter((token) => token.startsWith("'sha256-")).length,
    unsafeInline: scripts.includes("'unsafe-inline'"),
    frameAncestorsNone: directives.get("frame-ancestors")?.includes("'none'") ?? false,
    objectSrcNone: directives.get("object-src")?.includes("'none'") ?? false,
  };
}

export function disabledPermissions(value: string): string[] {
  return value.split(",").flatMap((permission) => {
    const match = /^\s*([a-z][a-z0-9-]*)\s*=\s*\(\s*\)\s*$/i.exec(permission);
    return match ? [match[1]] : [];
  });
}

export function hstsDays(value: string): number | null {
  const match = /(?:^|;)\s*max-age\s*=\s*(\d+)\s*(?:;|$)/i.exec(value);
  return match ? Math.floor(Number(match[1]) / 86400) : null;
}

const REFERRER_TOKENS = [
  "no-referrer",
  "no-referrer-when-downgrade",
  "origin",
  "origin-when-cross-origin",
  "same-origin",
  "strict-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url",
];
const SECURE_REFERRERS = [
  "no-referrer",
  "same-origin",
  "strict-origin",
  "strict-origin-when-cross-origin",
];

export function isSecureHeader(name: string, value: string): boolean {
  const v = value.trim().toLowerCase();
  switch (name.toLowerCase()) {
    case "content-security-policy": {
      const scripts = effectiveScripts(parseCsp(v));
      const unsafe = [
        "'unsafe-inline'",
        "'unsafe-eval'",
        "'unsafe-hashes'",
        "data:",
        "blob:",
        "http:",
        "https:",
      ];
      return (
        scripts !== undefined &&
        !scripts.some((token) => token.includes("*") || unsafe.includes(token))
      );
    }
    case "x-frame-options":
      return v === "deny" || v === "sameorigin";
    case "x-content-type-options":
      return v === "nosniff";
    case "referrer-policy": {
      const known = v
        .split(",")
        .map((token) => token.trim())
        .filter((token) => REFERRER_TOKENS.includes(token));
      return SECURE_REFERRERS.includes(known.at(-1) ?? "");
    }
    case "permissions-policy": {
      const entries = value.split(",").filter((entry) => entry.trim() !== "");
      return entries.length > 0 && disabledPermissions(value).length === entries.length;
    }
    case "cross-origin-opener-policy":
      return v === "same-origin" || v === "same-origin-allow-popups";
    default:
      return true;
  }
}

export type HeaderRow = { name: string; value: string | null; secure: boolean };
export type HeadersReport = {
  rows: HeaderRow[];
  present: number;
  received: number;
  total: number;
  hsts: HeaderRow;
};

export function readReport(
  get: (name: string) => string | null,
  names: readonly string[],
  hstsName: string,
): HeadersReport {
  const rows = names.map((name) => {
    const value = get(name);
    return { name, value, secure: value !== null && isSecureHeader(name, value) };
  });
  const hstsValue = get(hstsName);
  const days = hstsValue === null ? null : hstsDays(hstsValue);
  return {
    rows,
    present: rows.filter((row) => row.secure).length,
    received: rows.filter((row) => row.value !== null).length,
    total: rows.length,
    hsts: { name: hstsName, value: hstsValue, secure: days !== null && days > 0 },
  };
}
