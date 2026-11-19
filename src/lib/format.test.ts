import { describe, expect, it } from "vitest";
import { formatMonth, formatPeriod } from "./format";

describe("formatMonth", () => {
  it("formats a mid-year month", () => {
    expect(formatMonth("2026-06")).toBe("jun/2026");
  });
  it("handles january and december", () => {
    expect(formatMonth("2023-01")).toBe("jan/2023");
    expect(formatMonth("2023-12")).toBe("dez/2023");
  });
});

describe("formatPeriod", () => {
  it("marks an open period as atual", () => {
    expect(formatPeriod("2026-06", null)).toBe("jun/2026 – atual");
  });
  it("formats a closed period", () => {
    expect(formatPeriod("2023-05", "2026-02")).toBe("mai/2023 – fev/2026");
  });
});
