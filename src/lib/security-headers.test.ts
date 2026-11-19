import { describe, expect, it } from "vitest";
import {
  disabledPermissions,
  hstsDays,
  isSecureHeader,
  readReport,
  summarizeCsp,
} from "./security-headers";

const csp =
  "default-src 'self'; script-src 'self' 'sha256-bhHHL3z2vDgxUt0W3dWQOrprscmda2Y5pLsLg4GF+pI=' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests";
const permissions =
  "accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), interest-cohort=()";
const names = [
  "content-security-policy",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "cross-origin-opener-policy",
] as const;

describe("summarizeCsp", () => {
  it("summarizes the generated policy without treating inline styles as inline scripts", () => {
    expect(summarizeCsp(csp)).toEqual({
      scriptHashes: 2,
      unsafeInline: false,
      frameAncestorsNone: true,
      objectSrcNone: true,
    });
  });

  it("detects unsafe-inline in script-src", () => {
    expect(summarizeCsp("script-src 'self' 'unsafe-inline'").unsafeInline).toBe(true);
  });

  it("does not infer protections from missing directives", () => {
    expect(summarizeCsp("")).toEqual({
      scriptHashes: 0,
      unsafeInline: false,
      frameAncestorsNone: false,
      objectSrcNone: false,
    });
  });
});

describe("summarizeCsp effective script policy", () => {
  it("falls back to default-src when script-src is absent", () => {
    expect(summarizeCsp("default-src 'self' 'unsafe-inline'").unsafeInline).toBe(true);
    expect(summarizeCsp("default-src 'self'").unsafeInline).toBe(false);
  });
});

describe("isSecureHeader", () => {
  it("judges CSP by the effective script policy", () => {
    expect(isSecureHeader("content-security-policy", csp)).toBe(true);
    expect(isSecureHeader("content-security-policy", "default-src 'self'")).toBe(true);
    expect(isSecureHeader("content-security-policy", "default-src 'self' 'unsafe-inline'")).toBe(
      false,
    );
    expect(isSecureHeader("content-security-policy", "script-src 'self' https:")).toBe(false);
    expect(isSecureHeader("content-security-policy", "img-src 'self'")).toBe(false);
  });

  it("rejects unsafe frame, referrer and permissions values", () => {
    expect(isSecureHeader("x-frame-options", "ALLOWALL")).toBe(false);
    expect(isSecureHeader("x-frame-options", "DENY")).toBe(true);
    expect(isSecureHeader("x-frame-options", "sameorigin")).toBe(true);
    expect(isSecureHeader("referrer-policy", "no-referrer, unsafe-url")).toBe(false);
    expect(isSecureHeader("referrer-policy", "unsafe-url, strict-origin-when-cross-origin")).toBe(
      true,
    );
    expect(isSecureHeader("permissions-policy", "camera=(self)")).toBe(false);
    expect(isSecureHeader("permissions-policy", permissions)).toBe(true);
    expect(isSecureHeader("x-content-type-options", "nosniff")).toBe(true);
    expect(isSecureHeader("cross-origin-opener-policy", "unsafe-none")).toBe(false);
  });
});

describe("disabledPermissions", () => {
  it("reads all twelve disabled resources from the nginx policy", () => {
    expect(disabledPermissions(permissions)).toEqual([
      "accelerometer",
      "autoplay",
      "camera",
      "display-capture",
      "geolocation",
      "gyroscope",
      "magnetometer",
      "microphone",
      "midi",
      "payment",
      "usb",
      "interest-cohort",
    ]);
  });

  it("excludes resources with nonempty allowlists", () => {
    expect(disabledPermissions("camera=(), microphone=(self), usb=()")).toEqual(["camera", "usb"]);
    expect(disabledPermissions("")).toEqual([]);
  });
});

describe("hstsDays", () => {
  it("converts the HSTS max-age to whole days", () => {
    expect(hstsDays("max-age=31536000; includeSubDomains")).toBe(365);
    expect(hstsDays("max-age=172799")).toBe(1);
    expect(hstsDays("max-age=0")).toBe(0);
  });

  it("returns null when max-age is absent or invalid", () => {
    expect(hstsDays("")).toBeNull();
    expect(hstsDays("includeSubDomains")).toBeNull();
    expect(hstsDays("max-age=invalid")).toBeNull();
  });
});

describe("readReport", () => {
  it("counts four of six headers and keeps HSTS outside the count", () => {
    const headers = new Headers({
      "content-security-policy": csp,
      "x-frame-options": "DENY",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "strict-transport-security": "max-age=31536000; includeSubDomains",
    });

    const report = readReport((name) => headers.get(name), names, "strict-transport-security");

    expect(report.present).toBe(4);
    expect(report.total).toBe(6);
    expect(report.rows.map((row) => row.name)).toEqual(names);
    expect(report.rows[4]).toEqual({ name: "permissions-policy", value: null, secure: false });
    expect(report.hsts).toEqual({
      name: "strict-transport-security",
      value: "max-age=31536000; includeSubDomains",
      secure: true,
    });
  });

  it("does not count a present but unsafe header", () => {
    const headers = new Headers({
      "content-security-policy": csp,
      "x-frame-options": "ALLOWALL",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "permissions-policy": permissions,
      "cross-origin-opener-policy": "same-origin",
    });
    const report = readReport((name) => headers.get(name), names, "strict-transport-security");
    expect(report.present).toBe(5);
    expect(report.total).toBe(6);
    expect(report.rows[1].secure).toBe(false);
  });

  it("keeps absent headers unverified without inventing values", () => {
    const report = readReport(() => null, names, "strict-transport-security");
    expect(report.present).toBe(0);
    expect(report.total).toBe(6);
    expect(report.rows.every((row) => row.value === null)).toBe(true);
    expect(report.hsts.value).toBeNull();
  });
});
