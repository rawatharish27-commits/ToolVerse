
export async function process(input: { usesNativeApi: boolean, browserBlocked: boolean }) {
  return {
    cause: input.usesNativeApi ? "App uses private API endpoints" : (input.browserBlocked ? "AdBlocker/Extension conflict" : "Standard mismatch"),
    advice: "Clear browser cache or try Incognito mode."
  };
}
