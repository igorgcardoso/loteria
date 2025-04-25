export function generateRange(max: number): number[] {
  const number = Array.from({ length: max });
  return number.map((_, index) => index + 1);
}
