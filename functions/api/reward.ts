
import { success, error } from "../core/response";

/**
 * ToolVerse Edge Reward Hub API
 * Authorizes game outcomes to prevent client-side manipulation.
 */
export const onRequestPost = async (context: { request: Request; env: any }) => {
  try {
    const { gameId, options = {} } = await context.request.json();
    const rand = Math.random() * 100;
    let win = false;
    let prize = "NONE";
    let data: any = {};

    switch (gameId) {
      case 'spin':
        // High Value Prizes: Lower Probability
        if (rand < 2) { prize = "LIFETIME"; win = true; data.deg = 360 * 8 + 0; }
        else if (rand < 15) { prize = "CREDIT_50"; win = true; data.deg = 360 * 8 + 60; }
        else if (rand < 40) { prize = "NO_ADS_30"; win = true; data.deg = 360 * 8 + 180; }
        else { prize = "BADGE"; data.deg = 360 * 8 + 300; }
        break;

      case 'slot':
        const symbols = ["🎰", "🍒", "🍋", "🔔"];
        if (rand < 5) { data.slots = ["🎰", "🎰", "🎰"]; win = true; prize = "JACKPOT"; }
        else if (rand < 20) { data.slots = ["🍒", "🍒", "🍒"]; win = true; prize = "MEDIUM"; }
        else {
           data.slots = [
             symbols[Math.floor(Math.random() * 4)],
             symbols[Math.floor(Math.random() * 4)],
             symbols[Math.floor(Math.random() * 4)]
           ];
           // Ensure they aren't all same if rand > 20
           if (data.slots[0] === data.slots[1] && data.slots[1] === data.slots[2]) {
             data.slots[2] = symbols[(symbols.indexOf(data.slots[2]) + 1) % 4];
           }
        }
        break;

      case 'dice':
        const roll = Math.floor(Math.random() * 6) + 1;
        data.value = roll;
        if (roll === 6) { win = true; prize = "MEGA"; }
        break;

      default:
        data.status = "Logic confirmed";
    }

    return success({
      authorized: true,
      win,
      prize,
      data,
      xpReward: win ? 50 : 5,
      timestamp: Date.now()
    });

  } catch (err: any) {
    return error(err.message || "Arcade Node Connection Error");
  }
};
