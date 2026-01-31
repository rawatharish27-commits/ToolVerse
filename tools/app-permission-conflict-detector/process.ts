
export async function process(input: { permRequested: string, permGranted: boolean }) {
  return {
    conflict: !input.permGranted,
    impact: `System ${input.permRequested} unavailable`,
    fix: "Enable permission in System Settings -> Privacy."
  };
}
