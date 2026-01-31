
export async function process(input: { isVpnActive: boolean, siteGeoRestrict: boolean }) {
  return {
    impact: input.isVpnActive ? "IP pooled (Captcha risk high)" : "Native ISP",
    geoPass: input.isVpnActive || !input.siteGeoRestrict,
    recommendation: input.isVpnActive ? "Disable VPN for payment/govt portals" : "No action"
  };
}
