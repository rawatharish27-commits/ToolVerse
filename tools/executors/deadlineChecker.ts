export function deadlineChecker({
  deadlineStr,
  timezone = "Asia/Kolkata"
}: {
  deadlineStr: string;
  timezone?: string;
}) {
  try {
    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    
    if (diff < 0) return { status: "Expired", timeLeft: "None" };

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    let urgency = "Safe";
    if (hours < 2) urgency = "CRITICAL";
    else if (hours < 6) urgency = "URGENT";

    return {
      status: urgency,
      timeLeft: `${hours}h ${minutes}m`,
      advice: urgency === "Safe" ? "You have time, but verify your attachments now." : "Submit immediately. Portal traffic increases in the final hour."
    };
  } catch (e) {
    return { status: "Error", timeLeft: "Invalid Date Format" };
  }
}