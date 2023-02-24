export function generateRange(max: number): number[] {
  const range: number[] = [];

  for (let i = 1; i <= max; i++) {
    range.push(i);
  }

  return range;
}
