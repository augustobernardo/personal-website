export type CspSummary = {
  scriptHashes: number;
  unsafeInline: boolean;
  frameAncestorsNone: boolean;
  objectSrcNone: boolean;
};

export function summarizeCsp(value: string): CspSummary {
  const directives = new Map(
    value.split(";").map((directive) => {
      const [name, ...tokens] = directive.trim().split(/\s+/);
      return [name.toLowerCase(), tokens] as const;
    }),
  );
  const scripts = directives.get("script-src") ?? [];
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

export type HeaderRow = { name: string; value: string | null };
export type HeadersReport = {
  rows: HeaderRow[];
  present: number;
  total: number;
  hsts: HeaderRow;
};

export function readReport(
  get: (name: string) => string | null,
  names: readonly string[],
  hstsName: string,
): HeadersReport {
  const rows = names.map((name) => ({ name, value: get(name) }));
  return {
    rows,
    present: rows.filter((row) => row.value !== null).length,
    total: rows.length,
    hsts: { name: hstsName, value: get(hstsName) },
  };
}
