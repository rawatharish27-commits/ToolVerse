
export async function process(input: { platform: string }) {
  const diffs: Record<string, any> = {
    ios: { fonts: "Standard iOS system fonts only", interactivity: "Strict sandbox", layout: "Fixed width risk" },
    android: { fonts: "Roboto default", interactivity: "Dynamic", layout: "Fluid" },
    web: { fonts: "Full system access", interactivity: "Standard JS", layout: "Desktop View" }
  };
  return diffs[input.platform.toLowerCase()] || { error: "Unknown platform" };
}
