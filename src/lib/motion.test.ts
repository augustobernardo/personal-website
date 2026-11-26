import { describe, expect, it } from "vitest";
import { isBelowFold, staggerEach } from "./motion";

describe("staggerEach", () => {
  it("keeps the step when the group fits the budget", () =>
    expect(staggerEach(4, 0.06, 0.36)).toBe(0.06));
  it("shrinks the step for long groups", () =>
    expect(staggerEach(10, 0.06, 0.36)).toBeCloseTo(0.04));
  it("is zero for a single item", () => expect(staggerEach(1, 0.06, 0.36)).toBe(0));
});

describe("isBelowFold", () => {
  it("is false on screen and true below 88 %", () => {
    expect(isBelowFold(500, 800)).toBe(false);
    expect(isBelowFold(705, 800)).toBe(true);
  });
});
