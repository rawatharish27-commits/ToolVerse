
export async function process(input:{ramGB:number, cpuCores:number}) {
  return {
    limited: input.ramGB < 4 || input.cpuCores < 4,
    reason: "Low hardware resources affect performance"
  };
}
