/** Seconds between items so a group of `count` never takes longer than `total` to start. */
export function staggerEach(count: number, each: number, total: number): number {
  return count > 1 ? Math.min(each, total / (count - 1)) : 0;
}

/** True when an element's top sits below `ratio` of the viewport height. */
export function isBelowFold(top: number, viewportHeight: number, ratio = 0.88): boolean {
  return top > viewportHeight * ratio;
}
