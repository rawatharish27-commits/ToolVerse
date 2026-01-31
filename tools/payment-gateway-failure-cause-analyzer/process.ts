
export async function process(input:{errorCode:string}) {
  const map:any = {
    "PG01":"Timeout",
    "PG02":"Insufficient funds",
    "PG03":"Bank declined"
  };
  return {
    cause: map[input.errorCode] || "Unknown gateway issue"
  };
}
