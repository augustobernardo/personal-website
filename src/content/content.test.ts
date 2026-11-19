import { describe, expect, it } from "vitest";
import { experience } from "./experience";
import { projects, publishedProjects } from "./projects";

describe("content", () => {
  it("renders only published projects", () => {
    expect(publishedProjects.every((project) => project.published)).toBe(true);
    expect(publishedProjects.map((project) => project.slug)).not.toContain("romanos-oito");
  });

  it("uses unique project slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("links public projects to code and marks the rest as corporate", () => {
    for (const project of projects) {
      expect(Boolean(project.repoUrl) !== Boolean(project.corporate)).toBe(true);
    }
  });

  it("uses ISO months with start before end", () => {
    for (const item of experience) {
      expect(item.start).toMatch(/^\d{4}-\d{2}$/);
      if (item.end) expect(item.end >= item.start).toBe(true);
    }
  });
});
