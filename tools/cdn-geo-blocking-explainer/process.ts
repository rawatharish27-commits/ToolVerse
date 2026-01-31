
export async function process(input: { countryCode: string, siteAllowedIn: string[] }) {
  const allowed = input.siteAllowedIn.includes(input.countryCode);
  return {
    accessible: allowed,
    reason: allowed ? "Region supported" : `Service restricted in ${input.countryCode}`,
    fix: "Try using a Regional VPN server"
  };
}
