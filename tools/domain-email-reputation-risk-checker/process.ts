
export async function process(input: { domain: string, ageMonths: number, hasDmarc: boolean }) {
  let riskScore = 0;
  if (input.ageMonths < 6) riskScore += 40;
  if (!input.hasDmarc) riskScore += 30;
  if (input.domain.split('.').length > 3) riskScore += 20;

  return {
    riskLevel: riskScore > 60 ? "High" : (riskScore > 30 ? "Medium" : "Low"),
    reputationIndex: 100 - riskScore,
    verdict: riskScore > 40 ? "Likely flagged as spam by Gmail/Outlook" : "Safe sender reputation"
  };
}
