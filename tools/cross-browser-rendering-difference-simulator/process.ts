

export async function process(input: { browser: string }) {
  const engines: Record<string, string> = { safari: "WebKit", chrome: "Blink", firefox: "Gecko" };
  return {
    // Fix: Property 'toLowerCase' does not exist on type '{ browser: string; }'. Access 'browser' property first.
    engine: engines[input.browser.toLowerCase()] || "Unknown",
    // Fix: Property 'toLowerCase' does not exist on type '{ browser: string; }'. Access 'browser' property first.
    commonIssue: input.browser.toLowerCase() === "safari" ? "CSS Gap / Flexbox differences" : "Standard behavior",
    tip: "Use Autoprefixer for all CSS production builds"
  };
}