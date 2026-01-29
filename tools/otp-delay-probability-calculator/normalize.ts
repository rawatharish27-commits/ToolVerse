
export function normalize(input: any): any {
  return {
    ...input,
    hour: new Date().getHours(),
    isWeekend: [0, 6].includes(new Date().getDay())
  };
}
