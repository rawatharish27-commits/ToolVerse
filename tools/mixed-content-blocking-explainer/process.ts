
export async function process(input: { secureSite: boolean, insecureResources: number }) {
  const isBlocked = input.secureSite && input.insecureResources > 0;
  return {
    isBlocked,
    severity: input.insecureResources > 5 ? "Critical" : "Warning",
    solution: "Change all http:// references to https:// in source code."
  };
}
