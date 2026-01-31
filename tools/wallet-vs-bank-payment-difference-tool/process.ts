
export async function process(input:{method:string}) {
  return {
    instant: input.method === "wallet",
    reason: input.method === "wallet" ? "Wallet uses prepaid balance" : "Bank transfers take time"
  };
}
