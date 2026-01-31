
export async function process(input:{days:number}) {
  return {
    delayed: input.days > 7,
    reason: "Bank settlement cycles cause refund delays"
  };
}
